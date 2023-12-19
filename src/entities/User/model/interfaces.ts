export interface User {
  userId: number;
  name: string;
  surname: string;
  age: string;
  city: string;
}

export interface InitialState {
  isEditing: boolean;
  users: User[];
  draftUser: {
    draftId: number;
    user: User;
  };
  list: Array<User[]>;
}
