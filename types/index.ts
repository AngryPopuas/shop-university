

export interface IProduct {
    _id: string,
    title: string;
    description: string;
    price: number;
    imagesUrl: Array<string>;
}
export interface IProductCart extends IProduct {
    amout: number,
}
export interface IProfile {
    _id: string,
    name: string,
    isActivated: string,
    cart: Array<{ id: string, amout: number }>,
    avatar: string,
    orders: Array<string>,
    favorires: Array<string>,
}
export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    refreshToken: string,
    isActivated: string,
    avatar: string,
    cart: Array<{ id: string, amout: number }>,
    orders: Array<string>,
    favorires: Array<string>,
}