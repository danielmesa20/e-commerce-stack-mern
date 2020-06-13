import {
    GET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING,
    GET_PRODUCT, FILTER_PRODUCTS, RESET_LIST_PRODUCTS, CLEAR_PRODUCT_EDITED,
    ADD_COMMENT
} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

//GET ALL PRODUCTS
export const getProducts = () => (dispatch) => {
    dispatch({type: PRODUCTS_LOADING});
    const URL = 'http://localhost:4000/products/findAll';
    axios.get(URL)
        .then(res =>
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data['products']
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCTS_FAIL')));
};

//GET USER PRODUCTS 
export const getUserProducts = (idUser) => (dispatch, getState) => {
    dispatch({type: PRODUCTS_LOADING});
    const URL = 'http://localhost:4000/products/userProducts/';
    axios.get(URL + idUser, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data['products']
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCTS_FAIL')));
};

//GET ONE PRODUCT
export const getProduct = (id) => (dispatch, getState) => {
    dispatch({type: PRODUCTS_LOADING});
    const URL = 'http://localhost:4000/products/findOne/';
    axios.get(URL + id, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'GET_PRODUCT_FAIL')));
};

export const addComment = (newComment) => (dispatch, getState) => {
    const URL = 'http://localhost:4000/products/addComment';
    axios.post(URL, newComment, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_COMMENT,
                payload: res.data['comment']
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_COMMENT_FAIL')));
}

//CLEAN PRODUCT EDITED FROM STATE
export const cleanProductEdited = () => {
    return {type: CLEAR_PRODUCT_EDITED}
};

//DELETE PRODUCT
export const deleteProduct = (id) => (dispatch, getState) => {
    const URL = 'http://localhost:4000/products/delete/';
    axios.delete(URL + id, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_PRODUCT_FAIL')));
};

//ADD PRODUCT
export const addProduct = (newProduct) => (dispatch, getState) => {
    const URL = 'http://localhost:4000/products/add';
    axios.post(URL, newProduct, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })
        ).catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_PRODUCT_FAIL')));
};

//UPDATE PRODUCT
export const editProduct = (newProduct, id) => (dispatch, getState) => {

    const URL = 'http://localhost:4000/products/update/';
    axios.put(URL + id, newProduct, tokenConfig(getState))
        .then(res => dispatch({
            type: EDIT_PRODUCT
        }))
        .then(() => {
            window.location = "/";
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_PRODUCT_FAIL')));
};

//FILTER LIST OF PRODUCTS
export const filterProducts = (filterCategory, filterName) => (dispatch, getState) => {

    //GET ALL PRODUCTS FROM STATE 
    let products = getState().product.products;

    //Filter by category
    if (filterCategory !== 'DEFAULT') {
        products = products.filter((product) => {
            return product.category === filterCategory;
        })
    }

    //Filter by name
    if (filterName.length > 0) {
        products = products.filter((product) => {
            return product.name.toLowerCase().includes(filterName.toLowerCase());
        })
    }

    dispatch({
        type: FILTER_PRODUCTS,
        payload: products
    })
}

//RESET LIST OF PRODUCTS
export const resetListProducts = () => (dispatch, getState) => {

    const products = getState().product.products;

    dispatch({
        type: RESET_LIST_PRODUCTS,
        payload: products
    })
}
