export interface CreateOrderDetailDto {
    bookId: number;
    price: number;
    quantity: number;
}

export interface CreateOrderDto {
    name: string;
    phone: string;
    address: string;
    orderDetails: CreateOrderDetailDto[]
}