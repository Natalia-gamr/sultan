import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames'

import { useAppDispatch } from '../../hooks/redux';
import { addItem } from '../../reducers/CartSlice';

import { CardProps } from './Card.props'
import styles from './Card.module.css'
import { ButtonIcon } from '../ui-components/ButtonIcon/ButtonIcon';


export const Card = ({ product, className, ...props }: CardProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const clickHandler = () => navigate(`/catalog/${product.barecode}`)

    const onClickAdd = (event: MouseEvent<HTMLButtonElement>) => {
        if (!event.currentTarget.hasAttribute('active')) {
            dispatch(addItem(product));
        }
        event.currentTarget.textContent = 'В КОРЗИНЕ'
        event.currentTarget.setAttribute('active', '')
    }

    return (
        <div className={cn(className, styles.card)} {...props}>
            <img src={product.url} alt={product.title} className={styles.img} />
            <div className={styles.val}>
                {product.val} {product.type}
            </div>
            <div onClick={clickHandler} className={styles.title}>
                {product.title} <span className={styles.descr}>{product.descr}</span>
            </div>
            <div className={styles.descrItem}>
                Штрихкод: <span>{product.barecode}</span>
            </div>
            <div className={styles.descrItem}>
                Производитель: <span>{product.manufacture}</span></div>
            <div className={styles.descrItem}>
                Бренд: <span>{product.brand}</span>
            </div>
            <div className={styles.price}>
                <div> {product.price} ₸</div>
                <ButtonIcon size={'m'} icon={'cart'} onClick={onClickAdd}>В КОРЗИНУ</ButtonIcon>
            </div>
        </div>
    );
};