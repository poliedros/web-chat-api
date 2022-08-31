import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

type ChatPayloadDto = {
  username: string;
  date: Date;
  message: string;
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: ChatPayloadDto,
    @ConnectedSocket() client: Socket,
  ): Promise<ChatPayloadDto> {
    this.server.emit('message', payload);

    return Promise.resolve(payload);
  }
}
