import { IAuthState } from "./AuthTypes";
import { ITaskState } from "./TaskTypes";
import { UiState } from "./UITypes";

export interface IRootState {
    auth: IAuthState
    tasks: ITaskState
    ui: UiState
}