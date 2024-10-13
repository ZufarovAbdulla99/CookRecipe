export declare interface ISignUpRequest {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

export declare interface ISignUpResponse {
    access_token: string;
    refresh_token: string;
}