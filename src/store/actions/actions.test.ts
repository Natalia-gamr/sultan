import axios from "axios"

import { fetchFilters } from "./filtersActions";
import { fetchProduct } from "./productActions";

test('fetch filters', async () => {
    const thunk = fetchFilters()
    const dispatchMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(2)
})

test('fetch product', async () => {
    const thunk = fetchProduct()
    const dispatchMock = jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toBeDefined()
})

