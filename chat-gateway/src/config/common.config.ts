export default () => ({
  name: 'chat-gateway',
  env: process.env.NODE_ENV || 'dev',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080,
  pubSubRedisUrl: process.env.PUB_SUB_REDIS_URL,
  microserviceUrls: {
    chat: process.env.CHAT_SERVICE_URL || 'http://localhost:8081/',
    user: process.env.USER_SERVICE_URL || 'http://localhost:8082/',
  },
  swaggerOptions: {
    title: 'chat-gateway',
    description: 'chat-gateway',
    version: process.env.VERSION || 'default',
  },
  timeout: 10000,
});
