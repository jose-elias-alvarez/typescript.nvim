import { UserNotification, User } from "./types";

const user: User = { name: "Jose" };
const notification: UserNotification = { content: "hi", user };

console.log(notification);
