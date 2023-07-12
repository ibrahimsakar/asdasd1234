import { io } from 'socket.io-client';
import { INestApplication } from "@nestjs/common";

export const createWebSocketServer = (app: INestApplication) => {
    const httpServer = app.getHttpServer();
    if (!httpServer.address()) {
        httpServer.listen(0);
    }
    return io(`http://127.0.0.1:${httpServer.address().port}`);
};