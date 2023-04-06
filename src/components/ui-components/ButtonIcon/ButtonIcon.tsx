import cn from 'classnames'

import { ButtonIconProps, icons } from './ButtonIcon.props'
import styles from './ButtonIcon.module.css'

export const ButtonIcon = ({ children, icon, size, className, ...props }: ButtonIconProps) => {
    const IconComp = icons[icon];

    return (
        <button
            className={cn(className, styles.button, {
                [styles.xs]: size === 'xs',
                [styles.s]: size === 's',
                [styles.m]: size === 'm',
                [styles.l]: size === 'l'
            })}
            {...props} >
            {children}
            <IconComp />
        </button>
    );
};