export interface IUserInterface {
  login(email: string, password: string): Promise<any>;

  register(name: string, email: string, password: string): Promise<any>;

  addFriend(userId: string, friendId: string): Promise<any>;
}

export const IUserInterface = Symbol('IUserInterface');
