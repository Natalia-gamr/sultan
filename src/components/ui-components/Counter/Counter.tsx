import { CounterProps } from './Counter.props'
import styles from './Counter.module.css'

export const Counter = ({ onClick, product }: CounterProps) => {
    return (
        <>
            <button id='minus' onClick={onClick} className={styles.button}>-</button>
            <span id='count' className={styles.span}>{product.count}</span>
            <button id='plus' onClick={onClick} className={styles.button}>+</button>
        </>

    );
};