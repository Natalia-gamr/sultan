import { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom';
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addItem, clearItems, minusItem, removeItem } from '../../../reducers/CartSlice';
import { ProductModel } from '../../../interfaces/product.interface';

import { CartProps } from './Cart.props'
import styles from './Cart.module.css'
import { Htag } from '../../ui-components/Htag/Htag';
import { ButtonIcon } from '../../ui-components/ButtonIcon/ButtonIcon';
import { Button } from '../../ui-components/Button/Button';
import { Counter } from '../../ui-components/Counter/Counter';

export const Cart = ({ ...props }: CartProps) => {

    const { items, totalPrice } = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch()

    const removeItemCart = (i: ProductModel) => {
        dispatch(removeItem(i))
    }

    const sendCart = (e: MouseEvent) => {
        if (window.confirm('Оформить заказ?')) {
            let target = e.currentTarget.parentElement
            if (target !== null) {
                target.nextElementSibling?.classList.add(cn(styles.popupBlock))
            }
            setTimeout(() => {
                console.log(target)
                if (target !== null) {
                    target.nextElementSibling?.classList.remove(cn(styles.popupBlock))
                }
            }, 3000)
            dispatch(clearItems())
        }
    }

    const onCount = (e: MouseEvent, p: ProductModel) => {
        if (e.currentTarget.id === 'minus') {
            dispatch(minusItem(p))
        }

        if (e.currentTarget.id === 'plus') {
            dispatch(addItem(p))
        }
    }

    return (
        <div className={styles.cart} {...props}>
            <div>
                <div className={styles.nav}><NavLink to={'/'}>Главная</NavLink> / <NavLink to={'/cart'}>Корзина</NavLink></div>
            </div>
            <Htag tag={'h2'}>Корзина</Htag>
            <div>
                {items.map(i => {
                    return (
                        <div key={i.barecode} className={styles.card}>
                            <div className={styles.imgWrap} ><img className={styles.img} src={i.url} alt="" /></div>
                            <div className={styles.descrWrap}>
                                <div className={styles.val}>{i.val} {i.type}</div>
                                <div className={styles.title}>{i.title} {i.descr}</div>
                                <div className={styles.descr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. </div>
                            </div>
                            <div className={styles.count}>
                                <div>
                                    <Counter product={i} onClick={(e) => onCount(e, i)} />
                                </div>
                                <div>{i.count * +i.price}</div><div>₸</div>
                                <ButtonIcon size={'xs'} icon={'trash'} onClick={() => removeItemCart(i)}></ButtonIcon>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.total}>
                <Button onClick={sendCart} size={'m'}>Оформить заказ</Button>
                <div id='totalPrice'><span>{totalPrice} </span> ₸</div>
            </div>
            <div className={styles.popup}>Спасибо за заказ</div>
        </div>
    )
};