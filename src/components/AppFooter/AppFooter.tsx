import { NavLink } from 'react-router-dom'

import { ButtonIcon } from '../ui-components/ButtonIcon/ButtonIcon'
import styles from './AppFooter.module.css'

import logo from '../../resources/icons/logo-white.svg'
import wapp from '../../resources/icons/wapp.svg'
import mcard from '../../resources/icons/mcard.svg'
import visa from '../../resources/icons/Visa.svg'
import telegram from '../../resources/icons/telegram.svg'



export const AppFooter = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.wrap}>
                <div className={styles.category}>
                    <NavLink to={'/'}>
                        <img src={logo} alt="" />
                    </NavLink>
                    <div className={styles.descr}>Компания «Султан» — снабжаем розничные магазины товарами
                        "под ключ" в Кокчетаве и Акмолинской области</div>
                    <div className={styles.input}>
                        <div>Подпишись на скидки и акции</div>
                        <input type="text" placeholder='Введите ваш E-mail' />
                        <ButtonIcon size={'xs'} icon={'arrow'}></ButtonIcon>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Меню сайта:</div>
                    <div className={styles.category}>
                        <div>О компании</div>
                        <div>Доставка и оплата</div>
                        <div>Возврат</div>
                        <div>Контакты</div>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Категории:</div>
                    <div className={styles.category}>
                        <div>Бытовая химия</div>
                        <div>Косметика и гигиена</div>
                        <div>Товары для дома</div>
                        <div>Товары для детей и мам</div>
                        <div>Посуда</div>
                    </div>

                </div>
                <div>
                    <div className={styles.title}>Скачать прайс-лист:</div>
                    <div className={styles.category}>
                        <div><ButtonIcon size={'s'} icon={'download'}>Прайс-лист</ButtonIcon></div>
                        <div>Связь в мессенджерах:</div>
                        <div className={styles.social}>
                            <img src={wapp} alt="" />
                            <img src={telegram} alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Контакты:</div>
                    <div className={styles.category}>
                        <div>
                            <div>+7 (777) 490-00-91</div>
                            <div>время работы: 9:00-20:00</div>
                            <div>Заказать звонок</div>
                        </div>
                        <div>
                            <div>opt.sultan@mail.ru </div>
                            <div>На связи в любое время</div>
                        </div>
                        <div className={styles.cards}>
                            <img src={visa} alt="" /><img src={mcard} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

