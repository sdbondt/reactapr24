export interface IAuthState {
    token: string | null;
}

export interface IAuthForm {
    email: string;
    username?: string;
    password: string;
    confirmPassword?: string;
}

export interface SignupPayload {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface IAuthFormValidity {
    isValidEmail: boolean;
    isValidPassword: boolean;
    isValidUsername: boolean;
    isValidConfirmPassword: boolean;
}

export type Fields = 'email' | 'username' | 'password' | 'confirmPassword'

export interface FormValidityAction {
    field: Fields;
    payload: Partial<IAuthForm>;
}

export interface ConfirmLogoutModalInterface {
    toggleLogoutModal: () => void

}