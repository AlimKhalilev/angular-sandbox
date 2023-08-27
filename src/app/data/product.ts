/** Интерфейс продукта */
export interface IProduct {
    /** Уникальный номер */
    id: number,
    /** Заголовок */
    caption: string,
    /** Описание */
    description: string,
    /** Стоимость */
    cost: number,
    /** Количество */
    amount: number,
    /** Ссылка на изображение */
    image: string,
    /** Дата добавления (ISO) */
    add_date: string
}