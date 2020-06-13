import {
    GET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT,
    DELETE_PRODUCT, PRODUCTS_LOADING, GET_PRODUCT, FILTER_PRODUCTS,
    RESET_LIST_PRODUCTS, CLEAR_PRODUCT_EDITED, ADD_COMMENT
} from '../actions/types';

const initialState = {
    products: [],
    loading: false,
    product: {},
    filteredProducts: [],
    comments: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload,
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload),
                filteredProducts: state.products.filter(product => product._id !== action.payload)
            };
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                product: {}
            };
        case GET_PRODUCT:
            return {
                ...state,
                loading: false,
                product: action.payload['product'],
                comments: action.payload['comments']
            };
        case FILTER_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            };
        case RESET_LIST_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            };
        case CLEAR_PRODUCT_EDITED:
            return {
                ...state,
                product: {}
            };
        default:
            return state;
    }
}

