import { createReducer, on } from '@ngrx/store';
import { addItem, loadCart, removeItem, resetCart } from './cart.action';

export interface CartState {
    items: any[];
}

export const initialState: CartState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

export const cartReducer = createReducer(
    initialState,
    on(loadCart, (state, { items }) => ({ ...state, items })),
    on(addItem, (state, { item }) => ({ ...state, items: [...state.items, item] })),
    on(removeItem, (state, { id }) => ({
        ...state,
        items: state.items.filter(item => item.id !== id),
    })),
    on(resetCart, (state) => ({
        ...state,
        items: []
    }))
);
