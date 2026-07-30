export function validateEnv(config: Record<string, unknown>) {
  const requiredVars = ['PORT'];
  const optionalVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'APP_URL'];

  for (const envVar of requiredVars) {
    if (!config[envVar]) {
      // Use defaults for development
      config[envVar] = envVar === 'PORT' ? '3000' : '';
    }
  }

  return config;
}
