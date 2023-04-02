import styles from './AppHeader.module.css'
import logo from '../../resources/icons/logo.svg'
import map from '../../resources/icons/map.svg'
import mail from '../../resources/icons/mail.svg'
import cart from './cart.svg'

import consultation from '../../resources/img/consultation.png'
import { ButtonIcon } from '../ui-components/ButtonIcon/ButtonIcon'
import { SearchInput } from '../ui-components/Input/Input'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'

export const AppHeader = () => {

    const { items, totalPrice } = useAppSelector(state => state.cartReducer)
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);


    return (
        <div>
            <div className={styles.menu}>
                <div className={styles.menuItem}>
                    <div className={styles.info}>
                        <img src={map} alt="" />
                        <div className={styles.infoTitle}>г. Кокчетав, ул. Ж. Ташенова 129Б <span>(Рынок Восточный)</span></div>
                    </div>
                    <div className={styles.info}>
                        <img src={mail} alt="" />
                        <div className={styles.infoTitle}>opt.sultan@mail.ru<span>На связи в любое время</span></div>
                    </div>
                </div>
                <div className={styles.menuItem}>
                    <div className={styles.link}>О компании</div>
                    <div className={styles.link}>Доставка и оплата</div>
                    <div className={styles.link}>Возврат</div>
                    <div className={styles.link}>Контакты</div>
                </div>
            </div>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <NavLink to={'/'}>
                        <img src={logo} alt="" />
                    </NavLink>

                    <div className={styles.buttons}>
                        <NavLink to={'/catalog'}>
                            <ButtonIcon size={'m'} icon={'catalog'}>
                                Каталог
                            </ButtonIcon>
                        </NavLink>

                        <div className={styles.search}>
                            <SearchInput name='search' placeholder='Поиск...' type='text' />
                            <ButtonIcon className={styles.searchButton} size={'xs'} icon='search'>
                            </ButtonIcon>

                        </div>
                    </div>

                    <div className={styles.consultation}>
                        <div className={styles.numbers}>
                            <a href='#' className={styles.num}>+7 (777) 490-00-91</a>
                            <div>время работы: 9:00-20:00</div>
                            <a href='#' className={styles.feedback}>Заказать звонок</a>
                        </div>
                        <img src={consultation} alt="" />
                    </div>
                    <ButtonIcon size={'m'} icon='download'>
                        Прайс-лист
                    </ButtonIcon>

                    <NavLink to={'/cart'} className={styles.cart}>
                        <div className={styles.cartImg}>
                            <img src={cart} alt="" />
                            <span>{totalCount}
                            </span>
                        </div>

                        <div className={styles.cartInfo}>
                            Корзина
                            <span>{totalPrice} ₸</span>
                        </div>

                    </NavLink>


                </div>
            </div>

        </div >
    )
}

