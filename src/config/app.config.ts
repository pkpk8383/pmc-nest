export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appName: 'Positive Mantra Consulting',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
});
