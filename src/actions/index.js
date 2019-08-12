// import types
import * as types from './types';

// add balance
export const addBalance = amount => {
    return {
        type: types.ADD_BALANCE,
        payload: amount
    }
};
// update credit
export const updateCredit = amount => {
    return {
        type: types.UPDATE_CREDIT,
        payload: amount
    }
};
// update product quantity
export const updateQuantity = (selectProduct, newQuantity) => {
    return {
        type: types.UPDATE_QUANTITY,
        payload: {
            selectProduct,
            newQuantity,
        }
    }
}