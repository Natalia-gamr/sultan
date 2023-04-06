import { InputProps } from './Input.props'
import styles from './Input.module.css'
import cn from 'classnames'

export const SearchInput = ({ className, ...props }: InputProps) => {
    return (
        <input type='text' name='search' placeholder='Поиск...' className={cn(className, styles.input)} {...props} />
    );
};