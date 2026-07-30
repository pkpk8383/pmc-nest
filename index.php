<?php

declare(strict_types=1);

/**
 * Laragon front controller: reverse-proxy to the NestJS app.
 * Required because Apache DocumentRoot is the project folder and Nest listens on Node.
 */

$env = loadEnv(__DIR__ . DIRECTORY_SEPARATOR . '.env');
$host = $env['HOST'] ?? '127.0.0.1';
$port = $env['PORT'] ?? '3000';
$targetBase = sprintf('http://%s:%s', $host, $port);

$path = $_SERVER['REQUEST_URI'] ?? '/';
$targetUrl = $targetBase . $path;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$body = in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)
    ? file_get_contents('php://input')
    : null;

$headers = [
    'Host: ' . parse_url($targetBase, PHP_URL_HOST) . ':' . $port,
    'X-Forwarded-For: ' . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'),
    'X-Forwarded-Proto: ' . ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http'),
    'X-Forwarded-Host: ' . ($_SERVER['HTTP_HOST'] ?? 'pmc-nest.test'),
    'Accept-Encoding: identity',
];

$forwardHeaders = [
    'HTTP_ACCEPT' => 'Accept',
    'HTTP_ACCEPT_LANGUAGE' => 'Accept-Language',
    'HTTP_CONTENT_TYPE' => 'Content-Type',
    'HTTP_COOKIE' => 'Cookie',
    'HTTP_USER_AGENT' => 'User-Agent',
    'HTTP_AUTHORIZATION' => 'Authorization',
    'HTTP_X_REQUESTED_WITH' => 'X-Requested-With',
];

foreach ($forwardHeaders as $serverKey => $headerName) {
    if (!empty($_SERVER[$serverKey])) {
        $headers[] = $headerName . ': ' . $_SERVER[$serverKey];
    }
}

if ($body !== null && $body !== '' && empty($_SERVER['HTTP_CONTENT_TYPE']) && !empty($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: ' . $_SERVER['CONTENT_TYPE'];
}

$ch = curl_init($targetUrl);
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => true,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_CONNECTTIMEOUT => 5,
]);

if ($body !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>NestJS not running</title></head><body>';
    echo '<h1>NestJS app is not reachable</h1>';
    echo '<p>Start the app, then reload this page:</p>';
    echo '<pre>npm run start:dev</pre>';
    echo '<p>Expected: <code>' . htmlspecialchars($targetBase, ENT_QUOTES, 'UTF-8') . '</code></p>';
    echo '<p style="color:#666">' . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . '</p>';
    echo '</body></html>';
    exit;
}

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$rawHeaders = substr($response, 0, $headerSize);
$responseBody = substr($response, $headerSize);

http_response_code($status);

$hopByHop = [
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'content-encoding',
    'content-length',
];

foreach (explode("\r\n", $rawHeaders) as $headerLine) {
    if ($headerLine === '' || str_starts_with(strtolower($headerLine), 'http/')) {
        continue;
    }
    $pos = strpos($headerLine, ':');
    if ($pos === false) {
        continue;
    }
    $name = substr($headerLine, 0, $pos);
    $value = trim(substr($headerLine, $pos + 1));
    if (in_array(strtolower($name), $hopByHop, true)) {
        continue;
    }
    header($name . ': ' . $value, false);
}

echo $responseBody;

/**
 * @return array<string, string>
 */
function loadEnv(string $path): array
{
    if (!is_file($path)) {
        return [];
    }

    $vars = [];
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (
            (str_starts_with($value, '"') && str_ends_with($value, '"'))
            || (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }
        $vars[$key] = $value;
    }

    return $vars;
}
