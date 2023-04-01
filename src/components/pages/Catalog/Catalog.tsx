import styles from './Catalog.module.css'
import cn from 'classnames'
import { Htag } from '../../Htag/Htag';
import { Card } from '../../Card/Card';
import { CatalogFilter } from '../../CatalogFilter/CatalogFilter';
import { fetchProduct } from '../../../store/actions/productActions';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchFilters } from '../../../store/actions/filtersActions';
import { ProductModel } from '../../../interfaces/product.interface';
import ReactPaginate from 'react-paginate';
import { CatalogSidebar } from '../../CatalogSidebar/CatalogSidebar';
import { NavLink } from 'react-router-dom';

const ITEMS_PER_PAGE = 9

export const Catalog = () => {
    const dispatch = useAppDispatch()

    const { isLoadingProducts, errorProducts, products } = useAppSelector(state => state.productReducer)

    const [data, setData] = useState<ProductModel[]>([]);
    const [sortType, setSortType] = useState('price_up');

    useEffect(() => {
        const sortArray = (type: string) => {
            const sortProperty = type;

            const sorted = [...products].sort((a, b) => {
                switch (sortProperty) {
                    case 'title_up':
                        return a.title.localeCompare(b.title)
                    case 'title_down':
                        return b.title.localeCompare(a.title)
                    case 'price_down':
                        return +b.price - +a.price
                    default:
                        return +a.price - +b.price
                }
            })
            setData(sorted);
        }

        sortArray(sortType);
    }, [products, sortType]);


    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(fetchFilters())
    }, [dispatch])

    const [currentItems, setCurrentItems] = useState<ProductModel[] | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        const endOffset = itemOffset + ITEMS_PER_PAGE;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / ITEMS_PER_PAGE));
    }, [itemOffset, data, products.length]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        const newOffset = selected * ITEMS_PER_PAGE % products.length;
        setItemOffset(newOffset);
    };

    return (
        <div className={styles.catalog}>
            <div><NavLink to={'/'}>Главная</NavLink> / <NavLink to={'/catalog'}>Косметика и гигиена</NavLink></div>
            <div className={styles.head}>
                <div className={styles.title}>
                    <Htag tag={'h2'}>Косметика и гигиена</Htag>
                    <div className={styles.sort}>
                        Сортировка:
                        <select name="sort" id="sort" onChange={(e) => setSortType(e.target.value)}>
                            <option value="price_up">Цена &uarr;</option>
                            <option value="price_down">Цена &darr;</option>
                            <option value="title_up">Название &uarr;</option>
                            <option value="title_down">Название &darr;</option>
                        </select>
                    </div>
                </div>
                <CatalogFilter />
            </div>
            <div className={styles.wrap}>
                <CatalogSidebar />
                <div className={cn(styles.sales)}>


                    <div className={styles.cards}>
                        {isLoadingProducts && <p>Loading</p>}
                        {errorProducts && <p>{errorProducts}</p>}
                        {currentItems && currentItems.map(product => {
                            return (
                                <Card product={product} key={product.barecode}></Card>
                            )
                        })}
                    </div>
                    {products.length > ITEMS_PER_PAGE ?
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=" >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            containerClassName={styles.flex}
                            previousLabel="< "
                            pageClassName={styles.li}
                            activeLinkClassName={styles.active}
                        /> : <></>}

                </div>
            </div>

        </div>

    )
};