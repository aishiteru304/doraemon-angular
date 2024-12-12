import { createAction, props } from '@ngrx/store';

export const addItem = createAction('[Cart] Add Item', props<{ item: any }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ id: number }>());
export const loadCart = createAction('[Cart] Load Cart', props<{ items: any[] }>());
