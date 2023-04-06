import { ProductState, productSlice } from "../ProductSlice";

let state: ProductState;

beforeEach(() => {
    state = {
        products: [
            {
                url: "https://ir.ozone.ru/s3/multimedia-6/wc1000/6154806630.jpg",
                title: "Vichy Dercos",
                type: "мл",
                val: "390",
                barecode: "00015693",
                manufacture: "Л'Ореаль",
                brand: "Vichy",
                descr: "Интенсивный шампунь против перхоти",
                price: "165",
                care: "уход за волосами",
                count: 1
            },
            {
                url: "https://ir.ozone.ru/s3/multimedia-e/wc1000/6421304486.jpg",
                title: "Чистая Линия",
                type: "мл",
                val: "400",
                barecode: "00015692",
                manufacture: "Unilever",
                brand: "Чистая Линия",
                descr: "ДЕТСКАЯ ГЕЛЬ-ПЕНА ДЛЯ ДУША 2 В 1",
                price: "65",
                care: "уход за телом",
                count: 3
            }
        ],
        productsContainer: [
            {
                url: "https://ir.ozone.ru/s3/multimedia-6/wc1000/6154806630.jpg",
                title: "Vichy Dercos",
                type: "мл",
                val: "390",
                barecode: "00015693",
                manufacture: "Л'Ореаль",
                brand: "Vichy",
                descr: "Интенсивный шампунь против перхоти",
                price: "165",
                care: "уход за волосами",
                count: 1
            },
            {
                url: "https://ir.ozone.ru/s3/multimedia-e/wc1000/6421304486.jpg",
                title: "Чистая Линия",
                type: "мл",
                val: "400",
                barecode: "00015692",
                manufacture: "Unilever",
                brand: "Чистая Линия",
                descr: "ДЕТСКАЯ ГЕЛЬ-ПЕНА ДЛЯ ДУША 2 В 1",
                price: "65",
                care: "уход за телом",
                count: 3
            }
        ],
        isLoadingProducts: false,
        errorProducts: '',
        filterSidebar: {
            items: [],
            minPrice: 65,
            maxPrice: 165

        }
    }
})

test('fetching', () => {
    const newState = productSlice.reducer(state, productSlice.actions.fetching)

    expect(newState.isLoadingProducts).toBe(true)
})

test('fetch success', () => {
    const newState = productSlice.reducer(state, productSlice.actions.fetchSuccess)

    expect(newState.isLoadingProducts).toBe(false)
})

test('filter', () => {
    const newState = productSlice.reducer(state, productSlice.actions.filter({ id: '01', name: 'уход за телом' }))

    expect(newState.products.length).toBe(1)
})

test('filter sidebar', () => {
    const newFilter = {
        items: ['Unilever'],
        minPrice: 65,
        maxPrice: 100
    }
    const newState = productSlice.reducer(state, productSlice.actions.filterSidebar(newFilter))

    expect(newState.products[0].barecode).toBe(state.products[1].barecode)
})
