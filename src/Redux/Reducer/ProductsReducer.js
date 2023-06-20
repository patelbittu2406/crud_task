import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  ADD_TO_CART_SUCCESS
} from '../Constants/ProductsConstants';

const initialState = {
  products: [],
  carts: [], 
  loading: false,
  error: null,
  selectedProduct: null,
  deleting: false,
  deletedProductId: null,
  addingComment: false,
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };

    case FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        selectedProduct: null,
      };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedProduct: action.payload,
      };

    case FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        selectedProduct: null,
      };

    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(
        (product) => product._id !== action.payload
      );
      return {
        ...state,
        products: updatedProducts,
        loading: false,
        error: null,
        deletedProductId: action.payload.productId,
        deleting: true,
      };

    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addingComment: false,
        selectedProduct: {
          ...state.selectedProduct,
          comments: action.payload.comments,
        },
        error: null,
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addingComment: false,
        error: action.payload,
      };

    case DELETE_COMMENT_SUCCESS:
      const updatedComments = state.selectedProduct.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          comments: updatedComments,
        },
        loading: false,
        error: null,
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case ADD_TO_CART_SUCCESS:
        return {
          ...state,
          carts: [...state.carts, action.payload],
        };
    
    default:
      return state;
  }
};

export default ProductsReducer;
