/** Интерфейс данных логина */
export interface ILogin {
    /** Почта пользователя */
    email: string;
    /** Пароль пользователя */
    password: string;
    /** Ключ авторизации */
    auth_key: string;
}

/** Интерфейс данных регистрации пользователя */
export interface IRegistration {
    /** Почта пользователя */
    email: string;
    /** Пароль пользователя */
    password: string;
    /** Логин пользователя */
    user_login: string;
    /** Имя пользователя */
    first_name: string;
    /** Фамилия пользователя */
    last_name: string;
    /** Ключ авторизации */
    auth_key: string;
}

/** Интерфейс ответа на регистрацию */
export interface IRegistrationResponse {
    success: boolean,
    id: string,
    message: string,
    user: {
        ID: string,
        user_login: string,
        user_nicename: string,
        user_email: string,
        user_url: string,
        user_registered: string,
        user_activation_key: string,
        user_status: string,
        display_name: string
    },
    roles: string[],
    jwt: string
}

/** Интерфейс данных пользователя */
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

/** Интерфейс JWT токена */
export interface IJwt {
    /** JWT токен */
    jwt: string;
}
