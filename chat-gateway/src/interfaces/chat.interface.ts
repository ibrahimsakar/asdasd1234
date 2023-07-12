export interface IChatInterface {
  send(
    sender: string,
    friend: string,
    content: string,
  ): Promise<any>;

  update(messageId: string, status: number): Promise<any>;

  getMessages(userId: string): Promise<any>;
}

export const IChatInterface = Symbol('IChatInterface');
