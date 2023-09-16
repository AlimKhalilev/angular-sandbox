/** Ответ HTTP запроса */
export interface IHttpResponse<T> {
    /** Тело ответа */
    body?: T,
    /** Флаг загрузки данных */
    loading?: boolean,
    /** Флаг наличия ошибок после загрузки */
    hasError?: boolean,
    /** Сообщения ошибки загрузки */
    errorMsg?: string,
    /** Объект данных ошибки загрузки */
    errorData?: Record<string, any>,
}

/** Список методов HTTP запросов */
export enum EHttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}