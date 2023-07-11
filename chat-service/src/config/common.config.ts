export default () => ({
  name: 'chat-service',
  env: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8081,
  mongoDb: process.env.MONGODB_URL || 'mongodb://localhost:27017/chat',
  swaggerOptions: {
    title: 'chat-service',
    description: 'chat-service',
    version: process.env.VERSION || 'default',
  },
  timeout: 10000,
});
