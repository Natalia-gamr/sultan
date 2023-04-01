import { FilterModel } from "../../../interfaces/filter.interface";
import { ProductModel } from "../../../interfaces/product.interface";


export interface CatalogProps {
    products: ProductModel[];
    filters: FilterModel[];
}