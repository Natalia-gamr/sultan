import { MouseEvent, FormEvent, ChangeEvent } from "react"
import { useAppSelector } from "../../../hooks/redux"
import styles from './Admin.module.css'
import cn from 'classnames'
import { ProductModel } from "../../../interfaces/product.interface"
import { Htag } from "../../ui-components/Htag/Htag"
import { Button } from "../../ui-components/Button/Button"
import { ButtonIcon } from "../../ui-components/ButtonIcon/ButtonIcon"

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
        let arr = e.currentTarget.parentElement?.parentElement?.id
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
        if (window.confirm('Добавить товар?')) {
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
                'care': `${care}`,
                'count': 1
            }
            pushItem(obj)
            e.currentTarget.reset()
        }
    }

    const onFormNone = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.classList.toggle(cn(styles.block))
        }
    }

    return (
        <div className={styles.wrap}>
            <Htag tag={'h2'} >Admin page</Htag>
            <Button onClick={onClickHandler} size={"m"} className={styles.openButton}>Добавить товар</Button>

            <form className={styles.none} onSubmit={addForm}>
                <div className={styles.formTitle}>Добавление товара</div>
                <Button size={'xs'} onClick={onFormNone} className={styles.closeButton}>х</Button>
                <div className={styles.form}>
                    <div><label htmlFor="title">Название товара</label><input name='title' type="text" required /></div>
                    <div><label htmlFor="descr">Описание товара</label><input name='descr' type="text" required /></div>
                    <div><label htmlFor="val">Размер</label><input name='val' type="number" required /></div>
                    <div><label htmlFor="type">Тип размера</label><input name='type' type="text" required /></div>
                    <div><label htmlFor="brand">Бренд</label><input name='brand' type="text" required /></div>
                    <div><label htmlFor="manufacture">Производитель</label><input name='manufacture' type="text" required /></div>
                    <div><label htmlFor="price">Цена</label><input name='price' type="number" /></div>
                    <div><label htmlFor="barecode">Штрихкод</label><input name='barecode' type="number" required /></div>
                    <div><label htmlFor="url">Изображение (url)</label><input name='url' type="text" required /></div>
                </div>

                <div>Выберите тип ухода <span>(выберите и кликните 'Применить')</span>:</div>
                <div className={styles.checks} id='care'>
                    {filters.map(f => {
                        if (f.id !== '00') {
                            return (
                                <label htmlFor="url" key={f.id}>
                                    {f.name}
                                    <input id={f.name} name={f.name} type="checkbox" onChange={changeActive} />
                                </label>
                            )
                        }
                    })}
                    <button className={styles.careButton} onClick={onchangeInput}>Применить</button>
                </div>
                <Button size={"s"} className={styles.addButton}>Добавить товар</Button>
            </form>

            {productsContainer.map(p => {
                return (
                    <div id={p.barecode} key={p.barecode} className={styles.card}>
                        <div>
                            <img src={p.url} alt="" />
                            <ButtonIcon onClick={deleteItem} size={"xs"} icon={"trash"}></ButtonIcon>
                        </div>
                        <div className={styles.cardTitle}>
                            <div id="title">title: <span>{p.title}</span></div>
                            <div id="descr">descr: <span>{p.descr}</span></div>
                            <div id="val">val: <span>{p.val}</span></div>
                            <div id="type">type: <span>{p.type}</span></div>
                            <div id="barecode">barecode: <span>{p.barecode}</span></div>
                            <div id="manufacture">manufacture: <span>{p.manufacture}</span></div>
                            <div id="price">price: <span>{p.price}</span></div>
                            <div id="brand">brand: <span>{p.brand}</span></div>
                            <div id="care">care: <span>{p.care}</span></div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}