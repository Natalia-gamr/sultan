import { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { FilterModel } from '../../interfaces/filter.interface';
import { productSlice } from '../../reducers/ProductSlice';
import styles from './CatalogFilter.module.css'
import cn from 'classnames'
import { FilterProps } from './CatalogFilter.props';

export const CatalogFilter = ({ className }: FilterProps) => {

    const dispatch = useAppDispatch()
    const { filters, isLoadingFilter } = useAppSelector(state => state.filterReducer)
    const [filter, setFilter] = useState<FilterModel>({
        id: '',
        name: ''
    })

    useEffect(() => {
        dispatch(productSlice.actions.filter(filter))
    }, [filter, dispatch])

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let arr = e.currentTarget.parentElement?.children
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i] !== e.currentTarget && arr[i].hasAttribute('active')) {
                arr[i].removeAttribute('active')
                arr[i].classList.remove(cn(styles.active))
            }
        }
        e.currentTarget.setAttribute('active', '')
        e.currentTarget.classList.add(cn(styles.active))
        console.log(e.currentTarget.name)

        if (e.currentTarget.name === "Все") {
            setFilter(() => ({ name: '', id: '' }))
        } else {
            setFilter(() => ({ name: e.currentTarget.name.toLowerCase(), id: e.currentTarget.value }))

        }
    }

    if (isLoadingFilter) return <p>Loading...</p>

    return (
        <div className={cn(className, styles.filters)}>
            {filters.map(f => {
                return (
                    <button
                        value={f.id}
                        name={f.name}
                        key={f.id}
                        onClick={clickHandler}
                        className={styles.button}
                    >{f.name}</button>
                )
            })}
        </div>
    );
};