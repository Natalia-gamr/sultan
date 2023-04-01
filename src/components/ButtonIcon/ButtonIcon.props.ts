import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { ReactComponent as catalog } from './catalog.svg'
import { ReactComponent as download } from './download.svg'
import { ReactComponent as search } from './search.svg'
import { ReactComponent as cart } from './white-cart.svg'
import { ReactComponent as arrow } from './arrow.svg'
import { ReactComponent as trash } from './trash.svg'

export const icons = {
    catalog,
    download,
    search,
    cart,
    arrow,
    trash
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode;
    size: 'xs' | 's' | 'm' | 'l';
    icon: IconName;
}