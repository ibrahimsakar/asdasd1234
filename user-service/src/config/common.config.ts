export default () => ({
  name: 'user-service',
  env: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 8082,
  mongoDb: process.env.MONGODB_URL || 'mongodb://localhost:27017/chat',
  swaggerOptions: {
    title: 'user-service',
    description: 'user-service',
    version: process.env.VERSION || 'default',
  },
  timeout: 10000,
});
