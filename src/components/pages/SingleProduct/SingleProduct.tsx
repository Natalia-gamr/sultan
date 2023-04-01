import { SingleProductProps } from './SingleProduct.props'
import styles from './SingleProduct.module.css'
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect } from 'react';
import { fetchProduct } from '../../../store/actions/productActions';
import { ButtonIcon } from '../../ButtonIcon/ButtonIcon';

export const SingleProduct = ({ ...props }: SingleProductProps) => {

    const dispatch = useAppDispatch()
    const params = useParams<'barecode'>()
    const { productsContainer } = useAppSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    return (
        <div className={styles.wrap} {...props}>
            {productsContainer.map(p => {
                if (p.barecode === params.barecode) {
                    return (
                        <div key={p.barecode}>
                            <div><NavLink to={'/'}>Главная</NavLink> / <NavLink to={'/catalog'}>Каталог</NavLink> / <NavLink to={`/catalog/${p.barecode}`}>{p.title}</NavLink></div>
                            <div className={styles.product}>

                                <div className={styles.img}><img src={p.url} alt={p.title} /></div>

                                <div className={styles.prodWrap}>
                                    <p className={styles.inStock}>В наличии</p>
                                    <div className={styles.title}>{p.title} <span className={styles.descr}>{p.descr}</span> </div>
                                    <div className={styles.val}>{p.val} {p.type}</div>
                                    <div className={styles.priceWrap}>
                                        <div className={styles.price}> {p.price} ₸</div>
                                        <div><button disabled>-</button>{p.count || 0 + 0}<button disabled>+</button></div>


                                        <ButtonIcon disabled size={'m'} icon={'cart'}>В корзину</ButtonIcon>
                                    </div>
                                    <div className={styles.share}>share</div>
                                    <div>
                                        <div className={styles.brand}>Производитель: <span>{p.manufacture}</span></div>
                                        <div className={styles.brand}>Бренд: <span>{p.brand}</span></div>
                                        <div className={styles.brand}>Артикул:: <span>460404</span></div>
                                        <div className={styles.brand}>Штрихкод:: <span>{p.barecode}</span></div>
                                    </div>
                                    <div className={styles.desc}>
                                        <div>Описание</div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.</div>
                                    </div>
                                    <div>
                                        Характеристики
                                        <div className={styles.brand}>Назначение: <span>{p.brand}</span></div>
                                        <div className={styles.brand}>Тип: <span>{p.brand}</span></div>
                                        <div className={styles.brand}>Производитель: <span>{p.manufacture}</span></div>
                                        <div className={styles.brand}>Бренд: <span>{p.brand}</span></div>
                                        <div className={styles.brand}>Артикул: <span>460404</span></div>
                                        <div className={styles.brand}>Штрихкод: <span>{p.barecode}</span></div>
                                        <div className={styles.brand}>Вес: <span>{p.val}{p.type}</span></div>
                                        <div className={styles.brand}>Объем: <span>{p.val}{p.type}</span></div>
                                        <div className={styles.brand}>Кол-во в коробке: <span>{p.val}{p.type}</span></div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    )
                }
            })}
        </div>
    )
};


