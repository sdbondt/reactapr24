import { ITask } from "./TaskTypes";

export interface IUser {
    id: number;
    password: string;
    username: string;
    email: string;
    tasks: ITask[]
}