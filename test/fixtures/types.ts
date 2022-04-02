export interface User {
  name: string;
}

export interface UserNotification {
  user: User;
  content: string;
}
