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
}

/** Список методов HTTP запросов */
export enum EHttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}