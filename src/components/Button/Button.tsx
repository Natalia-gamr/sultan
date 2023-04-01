import { ButtonProps } from './Button.props'
import styles from './Button.module.css'
import cn from 'classnames'

export const Button = ({ children, size, className, ...props }: ButtonProps) => {

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
        </button>
    );
};