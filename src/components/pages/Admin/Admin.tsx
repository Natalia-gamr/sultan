import { MouseEvent, FormEvent, ChangeEvent } from "react"
import { useAppSelector } from "../../../hooks/redux"
import styles from './Admin.module.css'
import cn from 'classnames'
import { ProductModel } from "../../../interfaces/product.interface"

export const Admin = () => {

    const { products } = useAppSelector(state => state.productReducer)
    if (localStorage.getItem('product') === null) {
        localStorage.setItem('product', JSON.stringify(products))
    }

    let local = localStorage.getItem('product')
    let productsContainer: ProductModel[] = []
    if (local !== null) {
        productsContainer = JSON.parse(local)
    }

    const { filters } = useAppSelector(state => state.filterReducer)

    let prod: ProductModel[] = []
    let newProd: ProductModel[] = []
    let checks: string[] = []

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.nextElementSibling) {
            e.currentTarget.nextElementSibling.classList.toggle(cn(styles.block))
        }
    }
    const deleteItem = (e: MouseEvent) => {
        let arr = e.currentTarget.parentElement?.id
        const index = productsContainer.findIndex(n => n.barecode === arr)
        if (index !== -1) {
            productsContainer.splice(index, 1);
        }
        localStorage.setItem('product', JSON.stringify(productsContainer))

        window.location.reload()
    }

    const onchangeInput = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let target = e.currentTarget
        target.toggleAttribute('active')

        let arr = e.currentTarget.parentNode?.children
        console.log(arr)
        for (let i = 0; arr && i < arr.length; i++) {
            if (arr[i].hasAttribute('active')) {
                checks.push(arr[i].id.toLowerCase())
            }
        }
        return checks
    }

    const changeActive = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.toggleAttribute('active')
    }
    const toggleCare = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.nextElementSibling && e.currentTarget.nextElementSibling.classList.toggle(cn(styles.block))

    }
    const pushItem = (obj: ProductModel) => {
        if (prod) {
            prod.push(obj)
        }
        console.log(prod)
        newProd = prod.concat(productsContainer)
        localStorage.setItem('product', JSON.stringify(newProd))
        console.log(newProd)
        console.log(localStorage.getItem('product'))

        return newProd
    }

    const addForm = (e: FormEvent<HTMLFormElement>) => {
        const formData = Array.from(new FormData(e.currentTarget).entries())

        const form = Object.fromEntries(formData)

        let care: string = ''
        checks.forEach(el => {
            care += el + ', '
            return care
        });

        const obj: ProductModel = {
            'url': `${form.url}`,
            'title': `${form.title}`,
            'type': `${form.type}`,
            'val': `${form.val}`,
            'barecode': `${form.barecode}`,
            'manufacture': `${form.manufacture}`,
            'brand': `${form.brand}`,
            'descr': `${form.descr}`,
            'price': `${form.price}`,
            'care': `${care}`
        }
        pushItem(obj)
        e.currentTarget.reset()
    }

    return (
        <>
            <h1 >Admin page</h1>
            <button onClick={onClickHandler}></button>
            <form className={styles.none} onSubmit={addForm}>
                <label htmlFor="url">title</label><input name='url' type="text" required />
                <label htmlFor="title">descr</label><input name='title' type="text" required />
                <label htmlFor="type">val</label><input name='type' type="number" required />
                <label htmlFor="val">type</label><input name='val' type="text" required />
                <label htmlFor="barecode">barecode</label><input name='barecode' type="text" required />
                <label htmlFor="manufacture">manufacture</label><input name='manufacture' type="text" required />
                <label htmlFor="brand">price</label><input name='brand' type="number" required />
                <label htmlFor="descr">brand</label><input name='descr' type="text" required />
                <label htmlFor="price">url</label><input name='price' type="text" />
                <div onClick={toggleCare}>care</div>
                <span id='care' className={styles.none}>
                    {filters.map(f => {
                        if (f.id !== '00') {
                            return (
                                <>
                                    <label htmlFor="url" key={f.id}>{f.name}</label>
                                    <input id={f.name} name={f.name} type="checkbox" onChange={changeActive} />
                                </>
                            )
                        }
                    })}
                    <button onClick={onchangeInput}>Применить</button>
                </span>
                <button>add</button>
            </form>

            {productsContainer.map(p => {
                return (
                    <div id={p.barecode} key={p.barecode}>
                        <div>title:</div>
                        <span id="title">{p.title}</span>
                        <div>  descr:</div>
                        <span id="descr">{p.descr}</span>
                        <div>val:</div>
                        <span id="val">{p.val}</span>
                        <div> type:</div>
                        <span id="type">{p.type}</span>
                        <div> barecode:</div >
                        <span id="barecode">{p.barecode}</span>
                        <div>  manufacture:</div >
                        <span id="manufacture">{p.manufacture}</span>
                        <div> price:</div >
                        <span id="price">{p.price}</span>
                        <div>  brand:</div >
                        <span id="brand">{p.brand}</span>
                        <div> url:</div >
                        <span id="url">{p.url}</span>
                        <div> care:</div >
                        <span id="care">{p.care}</span>
                        <button onClick={deleteItem}>delete</button>
                    </div>
                )

            })}
        </>

    )
}