import { CartState, cartSlice } from "../CartSlice";

let state: CartState;

beforeEach(() => {
    state = {
        totalPrice: 360,
        totalCount: 4,
        items: [
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
        ]
    }
})

test('add item', () => {
    const newState = cartSlice.reducer(state, cartSlice.actions.addItem(state.items[0]))

    expect(newState.items[0].count).toBe(2)
    expect(newState.items[1].count).toBe(3)
    expect(newState.totalPrice).toBe(state.totalPrice + +state.items[0].price)
    expect(newState.totalCount).toBe(state.totalCount + 1)
})

test('minus item', () => {
    const newState = cartSlice.reducer(state, cartSlice.actions.minusItem(state.items[1]))

    expect(newState.items[0].count).toBe(1)
    expect(newState.items[1].count).toBe(2)
    expect(newState.totalPrice).toBe(state.totalPrice - +state.items[1].price)
    expect(newState.totalCount).toBe(3)
})

test('remove item', () => {
    const newState = cartSlice.reducer(state, cartSlice.actions.removeItem(state.items[1]))

    expect(newState.items[0].count).toBe(1)
    expect(newState.items[1]).toBeUndefined()
    expect(newState.totalPrice).toBe(+state.items[0].price * +state.items[0].count)
    expect(newState.totalCount).toBe(1)
})

test('clear items', () => {
    const newState = cartSlice.reducer(state, cartSlice.actions.clearItems())

    expect(newState.items).toEqual([])
    expect(newState.items[0]).toBeUndefined()
    expect(newState.totalPrice).toBe(0)
    expect(newState.totalCount).toBe(0)
})