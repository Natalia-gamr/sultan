import { ProductModel } from "../../../interfaces/product.interface";
import { MouseEvent } from "react";

export interface CounterProps {
    product: ProductModel
    onClick: (e: MouseEvent) => void
}