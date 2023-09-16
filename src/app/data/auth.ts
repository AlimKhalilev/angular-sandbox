export interface ILogin {
    /** Почта пользователя */
    email: string;
    /** Пароль пользователя */
    password: string;
}

export interface IUser {
    /** Почта пользователя */
    email: string;
    /** Unix time окончания валидности токена */
    exp: number;
    /** Unix time создания токена */
    iat: number;
    /** Строковый id пользователя */
    id: string;
    /** Сайт от куда был получен токен */
    site: string;
    /** Логин пользователя */
    username: string;
}

export interface IAuthResponse {
    data: { jwt: string };
    success: boolean;
}
