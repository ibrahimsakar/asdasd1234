export interface IUserInterface {
  login(email: string, password: string): Promise<any>;

  register(name: string, email: string, password: string): Promise<any>;

  addFriend(user: string, friend: string): Promise<any>;
}

export const IUserInterface = Symbol('IUserInterface');
