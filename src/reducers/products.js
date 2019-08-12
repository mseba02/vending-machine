// imports
import {ADD_BALANCE, UPDATE_CREDIT, UPDATE_QUANTITY} from "../actions/types";
// data
const initialState = {
    balance: 0,
    keypad: [
        {
            firstL:"A",
            id: 1
        },
        {
            firstL:"B",
            id: 2
        },
        {
            firstL:"C",
            id: 3
        },
        {
            firstL:"1",
            id: 4
        },
        {
            firstL:"2",
            id: 5
        },
        {
            firstL:"3",
            id: 6
        }
    ],
    items: [
        {
            keyCode: 'A1',
            qtty: 8,
            price: 20,
            name: "Snickers"
        },
        {
            keyCode: 'A2',
            qtty: 5,
            price: 15,
            name: "Bounty"
        },
        {
            keyCode: 'A3',
            qtty: 10,
            price: 10,
            name: "Mars"
        },
        {
            keyCode: 'B1',
            qtty: 2,
            price: 20,
            name: "Kit Kat"
        },
        {
            keyCode: 'B2',
            qtty: 1,
            price: 75,
            name: "M&Ms"
        },
        {
            keyCode: 'B3',
            qtty: 6,
            price: 22,
            name: "Coca Cola"
        },
        {
            keyCode: 'C1',
            qtty: 0,
            price: 11,
            name: "Fanta"
        },
        {
            keyCode: 'C2',
            qtty: 8,
            price: 32,
            name: "Sprite"
        },
        {
            keyCode: 'C3',
            qtty: 8,
            price: 50,
            name: "Cola Zero"
        }
    ]
};
// reducer state
export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        // add balance
        case ADD_BALANCE:
            return {...state, balance: state.balance + action.payload};

        // update credit
        case UPDATE_CREDIT:
            return {...state, balance: state.balance - action.payload};

        // update quantity
        case UPDATE_QUANTITY:
            const productIndex = state.items.findIndex((item) => item.keyCode === action.payload.selectProduct);
            const product = state.items.find((item) => item.keyCode === action.payload.selectProduct);
            const updatedItemsState = state.items.slice();
            updatedItemsState[productIndex] = {
                ...product,
                qtty: action.payload.newQuantity,
            };
            return {
                ...state,
                items: updatedItemsState,
            };

        //  default
        default:
            return state;
    }
};