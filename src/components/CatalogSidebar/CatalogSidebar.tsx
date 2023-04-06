import { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import cn from 'classnames'

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FilterSidebar, productSlice } from '../../reducers/ProductSlice';

import styles from './CatalogSidebar.module.css'

import { Button } from '../ui-components/Button/Button';
import { ButtonIcon } from '../ui-components/ButtonIcon/ButtonIcon';
import { CatalogFilter } from '../CatalogFilter/CatalogFilter';
import { SearchInput } from '../ui-components/Input/Input';

export const CatalogSidebar = () => {
    const { productsContainer } = useAppSelector(state => state.productReducer)

    let pricesArr: number[] = [];
    productsContainer.map(p => pricesArr.push(+p.price))
    let min = Math.min(...pricesArr)
    let max = Math.max(...pricesArr)
    const dispatch = useAppDispatch()
    const [filter, setFilter] = useState<FilterSidebar>({
        items: [],
        minPrice: 42,
        maxPrice: 347
    })

    useEffect(() => {
        setFilter(filter)
    }, [dispatch, filter])

    const priceMin = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value >= min && +e.target.value <= max) {
            return filter.minPrice = +e.target.value
        }
    }
    const priceMax = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value <= max && +e.target.value >= min) {
            return filter.maxPrice = +e.target.value
        }
        console.log(filter)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.parentElement && e.currentTarget.parentElement.toggleAttribute('active')
        e.currentTarget.classList.toggle(cn(styles.active))
    }

    const onclickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        filter.items = [];
        let arr = e.currentTarget.parentNode?.parentNode?.firstElementChild?.children
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i].children.length !== 0 &&
                arr[i].children[0].nodeName === 'INPUT' &&
                arr[i].hasAttribute('active')) {
                filter.items.push(arr[i].children[0].id)
            }
        }

        dispatch(productSlice.actions.filterSidebar(filter))
    }

    const deleteCheck = (e: MouseEvent<HTMLButtonElement>) => {
        let arr = e.currentTarget.parentNode?.parentNode?.firstElementChild?.children
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i].children.length !== 0 && arr[i].children[0].nodeName === 'INPUT' && arr[i].hasAttribute('active')) {
                arr[i].removeAttribute('active')
                arr[i].children[0].classList.remove(cn(styles.active))
            }
        }
    }

    const deleteFilter = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(productSlice.actions.deleteFilterSidebar(filter))

        filter.items = []
        filter.minPrice = 42
        filter.maxPrice = 347
        deleteCheck(e);
    }


    let brands: string[] = [];
    productsContainer.map(p => brands.push(p.brand))

    let manufacture: string[] = [];
    productsContainer.map(p => manufacture.push(p.manufacture))

    return (
        <div className={styles.sidebar}>
            <h3>подбор по параметрам</h3>
            <div>
                <p>Цена ₸</p>
                <div className={styles.inputWrap}><input type="number" onChange={priceMin} placeholder={min.toString()} className={styles.inputPrice} />
                    -
                    <input type="number" onChange={priceMax} placeholder={max.toString()} className={styles.inputPrice} /></div>

            </div>
            <div>

                <div className={styles.wrap}>
                    <p className={styles.title}>Производитель</p>
                    <div className={styles.search}>
                        <SearchInput name='search' placeholder='Поиск...' type='text' />
                        <ButtonIcon className={styles.searchButton} size={'xs'} icon='search'>
                        </ButtonIcon>

                    </div>
                    {manufacture
                        .sort()
                        .filter((item, index) => manufacture.indexOf(item) === index)
                        .map(p => {
                            return (
                                <div key={p} className={styles.inputWrap}>
                                    <input
                                        id={p}
                                        name={p}
                                        type="checkbox"
                                        onChange={onChangeHandler}
                                        className={styles.input}
                                    />
                                    <label htmlFor={p} className={styles.label}>{p}</label>
                                </div>
                            )
                        })}

                    <p className={styles.title}>Бренд</p>
                    <div className={styles.search}>
                        <SearchInput name='search' placeholder='Поиск...' type='text' />
                        <ButtonIcon className={styles.searchButton} size={'xs'} icon='search'>
                        </ButtonIcon>

                    </div>
                    {brands
                        .sort()
                        .filter((item, index) => brands.indexOf(item) === index)
                        .map(p => {
                            return (
                                <div key={p} className={styles.inputWrap}>
                                    <input id={p} type="checkbox" onChange={onChangeHandler} className={styles.input} />
                                    <label htmlFor={p} className={styles.label}>{p}</label>
                                </div>

                            )
                        }
                        )}
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.button} size={'m'} onClick={onclickHandler}>Показать</Button>
                    <ButtonIcon size={'xs'} icon={'trash'} onClick={deleteFilter}></ButtonIcon>
                </div>

            </div>
            <div>
                <CatalogFilter className={styles.filter} />
            </div>
        </div>
    )

};