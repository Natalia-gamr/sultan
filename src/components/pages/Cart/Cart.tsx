import { CartProps } from './Cart.props'
import styles from './Cart.module.css'
import { Htag } from '../../ui-components/Htag/Htag';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Card } from '../../Card/Card';
import { NavLink } from 'react-router-dom';
import { MouseEvent } from 'react'
import cn from 'classnames'
import { ButtonIcon } from '../../ui-components/ButtonIcon/ButtonIcon';
import { clearItems, removeItem } from '../../../reducers/CartSlice';
import { ProductModel } from '../../../interfaces/product.interface';
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

        let arr = e.currentTarget.parentElement

        let count = arr?.children.namedItem('count')
        let totalPriceItem = arr?.nextSibling
        let totalPrice = arr?.parentElement?.parentElement?.parentElement?.nextElementSibling?.children.namedItem('totalPrice')?.firstElementChild
        // console.log(totalPrice)

        if (e.currentTarget.id === 'minus' &&
            count && count.textContent &&
            count.textContent !== '0' &&
            totalPriceItem &&
            totalPriceItem.textContent !== null &&
            totalPrice &&
            totalPrice.textContent !== null) {

            count.textContent = `${+count.textContent - 1}`
            totalPriceItem.textContent = `${+totalPriceItem.textContent - +p.price}`
            totalPrice.textContent = `${+totalPrice.textContent - +p.price}`
        }
        if (e.currentTarget.id === 'plus' &&
            count && count.textContent &&
            totalPriceItem &&
            totalPriceItem.textContent !== null &&
            totalPrice &&
            totalPrice.textContent !== null) {

            count.textContent = `${+count.textContent + 1}`
            totalPriceItem.textContent = `${+totalPriceItem.textContent + +p.price}`
            totalPrice.textContent = `${+totalPrice.textContent + +p.price}`

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
                        <div className={styles.card}>
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
                <Button className={styles.button} onClick={sendCart} size={'m'}>Оформить заказ</Button>

                <div id='totalPrice'><span>{totalPrice} </span> ₸</div>

            </div>
            <div className={styles.popup}>Спасибо за заказ</div>
        </div>
    )
};