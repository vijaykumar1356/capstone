
import axios from 'axios';
import {    
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADD_TO_CART,
    DELETE_TO_CART,
    UPDATE_CART_QTY,
    ADD_TO_WISHLIST,
    ORDER_LOADED_SUCCESS,
    ORDER_LOADED_FAIL,
    ORDER_ITEM_LOADED_SUCCESS,
    ORDER_ITEM_LOADED_FAIL,    
    ORDER_USER_ITEM_LOADED_SUCCESS,
    ORDER_USER_ITEM_LOADED_FAIL,
    RATING_SUCCESS,
    RATING_FAIL,
    EMPTY_TO_CART
    

} from './types';






export const load_product = () => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, config);            
            // console.log(res.data)
            
            dispatch({
                type: PRODUCT_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.log("error in load product",err)
            dispatch({
                type: PRODUCT_LOADED_FAIL
            });
        }
  
};


export const load_product_detail = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // const body = JSON.stringify({ id });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data
        });

        
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL
        });
    }
};











export const add_to_cart_handle = (product,qty) =>{
    // console.log(product,qty)


    return {
        
        type: ADD_TO_CART,
        payload: {
            id: product.id,
            title: product.title,
            price: product.price,
            qty: qty,
            image: product.image,

          
        },
      }
   
};



export const delete_to_cart_handle = (id) =>{
    // console.log("okey",id)


    return {
        
        type: DELETE_TO_CART,
        payload: {
            id: id
          
        },
      }
   
};



export const update_cart_qty_handle = (id,qty) =>{
    // console.log("okey update",qty,id)


    return {
        
        type: UPDATE_CART_QTY,
        payload: {
            id: id,
            qty:qty
          
        },
      }
   
};







export const add_to_wishlist_handle = (product) =>{
    // console.log(product)


    return {
        
        type: ADD_TO_WISHLIST,
        payload: {
            id: product.id,
            title: product.title,
            price: product.price,            
            image: product.image,

          
        },
      }
   
};






export const load_order = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order`, config);            
        // console.log(res.data)
        
        dispatch({
            type: ORDER_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log("error in load product",err)
        dispatch({
            type: ORDER_LOADED_FAIL
        });
    }

};





export const load_order_item_detail = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orderitemdetail`, config);            
        // console.log(res.data)
        
        dispatch({
            type: ORDER_ITEM_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log("error in load product",err)
        dispatch({
            type: ORDER_ITEM_LOADED_FAIL,
        });
    }

};






export const load_user_order_detail = (userId) => async dispatch => {
    
    try {                       
        const res =   await axios.get(`${process.env.REACT_APP_API_URL}/api/orderdetail/`, {
            params: {
                user_key:userId
            }
          })
    
        dispatch({
            type: ORDER_USER_ITEM_LOADED_SUCCESS,
            payload: res.data
        });
          
        
      
        
    } catch (err) {
        console.log("error in load product",err)
        dispatch({
            type: ORDER_USER_ITEM_LOADED_FAIL,
        });
    }

};





export const product_rating = (comment,rating,product,user) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({user,product, rating, comment   });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/rating/`, body, config);
        console.log(res);
        dispatch({
            type: RATING_SUCCESS,
            payload: res.data
        });

        
    } catch (err) {
        dispatch({
            type: RATING_FAIL
        });
    }
};




export const empty_to_cart_handle = (id) =>{


    return {
        
        type: EMPTY_TO_CART,
        payload: {
            id: id
          
        },
      }
   
};




