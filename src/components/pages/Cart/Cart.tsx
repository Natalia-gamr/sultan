import { CartProps } from './Cart.props'
import styles from './Cart.module.css'
import { Htag } from '../../Htag/Htag';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Card } from '../../Card/Card';
import { NavLink } from 'react-router-dom';
import { MouseEvent } from 'react'
import cn from 'classnames'
import { ButtonIcon } from '../../ButtonIcon/ButtonIcon';
import { clearItems, removeItem } from '../../../reducers/CartSlice';
import { ProductModel } from '../../../interfaces/product.interface';
import { Button } from '../../Button/Button';

export const Cart = ({ ...props }: CartProps) => {

    const { items, totalPrice } = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch()

    const removeItemCart = (i: ProductModel) => {
        dispatch(removeItem(i))
    }
    const sendCart = (e: MouseEvent) => {
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

    return (
        <div className={styles.cart} {...props}>
            <div>
                <div className={styles.nav}><NavLink to={'/'}>Главная</NavLink> / <NavLink to={'/cart'}>Корзина</NavLink></div>
            </div>
            <Htag tag={'h2'}>Корзина</Htag>

            <div className={styles.cards}>
                {items.map(i => {
                    return (
                        <div className={styles.card}>
                            <div className={styles.imgWrap} ><img className={styles.img} src={i.url} alt="" /></div>
                            <div className={styles.descrWrap}>
                                <div>{i.val}{i.type}</div>
                                <div>{i.title}{i.descr}</div>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. </div>
                            </div>
                            <div className={styles.count}>
                                <div><button disabled>-</button>{1}<button disabled>+</button></div>
                                <div>{i.price} ₸</div>
                                <ButtonIcon size={'xs'} icon={'trash'} onClick={() => removeItemCart(i)}></ButtonIcon>
                            </div>

                        </div>
                    )
                })}

            </div>
            <div className={styles.total}>
                <Button className={styles.button} onClick={sendCart} size={'m'}>Оформить заказ</Button>

                <div>{totalPrice} ₸</div>
            </div>
            <div className={styles.popup}>Спасибо за заказ</div>
        </div>
    )
};