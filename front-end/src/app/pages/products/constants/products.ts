export enum prodFields {
    prodId = "product Id",
    category = "Category",
    name = "Name",
    quty = "Quantity",
    suppl = "Supplier",
    price = "Price",
}

export interface IProductPage {
    [prodFields.prodId]?: number,
    [prodFields.category]?: string,
    [prodFields.name]: string,
    [prodFields.quty]: number,
    [prodFields.suppl]?: string,
    [prodFields.price]: number
}