import { ProductModel } from '../interfaces/product.interface';

export const calcTotalPrice = (items: ProductModel[]) => {
    return items.reduce((sum, obj) => +obj.price * obj.count + sum, 0);
};