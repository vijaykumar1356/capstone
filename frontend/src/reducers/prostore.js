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
  ORDER_ITEM_LOADED_SUCCESS,
  ORDER_USER_ITEM_LOADED_SUCCESS,
  RATING_SUCCESS,
  RATING_FAIL,
  EMPTY_TO_CART,
} from "../actions/types";

const initialState = {
  Products: [],
  Productsdetails: [],
  Cartvalue: [],
  Wishlistvalues: [],
  Orders: [],
  Ordersitem: [],
  Userorder: [],
  
};

export default function (state = initialState, action) {
  let existedItemIndex;
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LOADED_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
        Products: payload,
      };
    case PRODUCT_DETAILS_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
        Productsdetails: payload,
      };
    case ADD_TO_CART:
      // console.log("hello");
      // console.log("reducer:",payload);
      // console.log("hello");

      existedItemIndex = state.Cartvalue.findIndex((i) => i.id === payload.id);

      // console.log(existedItemIndex)
      if (existedItemIndex !== -1) {
        // if the item existed
        let newCart = state.Cartvalue;
        newCart[existedItemIndex].qty += payload.qty;
        return { ...state, Cartvalue: newCart };
      } else
        return { ...state, Cartvalue: [...state.Cartvalue, action.payload] };

    // return {
    //     ...state,
    //     Cartvalue: state.Cartvalue.push(payload)
    // }

    case ADD_TO_WISHLIST:
      // console.log("hello");
      // console.log("reducer:",payload);
      // console.log("hello");
      existedItemIndex = state.Wishlistvalues.findIndex(
        (i) => i.id === payload.id
      );

      // console.log(existedItemIndex);
      if (existedItemIndex !== -1) {
        return {
          ...state,
          Wishlistvalues: state.Wishlistvalues.filter(
            (item) => item.id !== payload.id
          ),
        };
      } else {        
        return {
          ...state,
          Wishlistvalues: [...state.Wishlistvalues, action.payload],
        };
      }

    case DELETE_TO_CART:      
      return {
        ...state,
        Cartvalue: state.Cartvalue.filter((item) => item.id !== payload.id),
      };

    case UPDATE_CART_QTY:
      state.Cartvalue[
        state.Cartvalue.findIndex((item) => item.id === payload.id)
      ].qty = payload.qty;
      return {
        ...state,
        Cartvalue: [...state.Cartvalue],
      };

    case EMPTY_TO_CART:
      // console.log("ok");
      return {
        ...state,
        Cartvalue: [],
      };
      

    case ORDER_ITEM_LOADED_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
        Ordersitem: payload,
      };

    case ORDER_LOADED_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
        Orders: payload,
      };

    case ORDER_USER_ITEM_LOADED_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
        Userorder: payload,
      };
    case RATING_SUCCESS:
      // console.log("hello");
      // console.log(payload);
      // console.log("hello");
      return {
        ...state,
      };
   
      
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_LOADED_FAIL:
      return {
        ...state,
        Products: [],
        Productsdetails: [],
      };

    default:
      return state;
  }
}
