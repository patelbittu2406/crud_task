import api from "../../Service/api";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
} from "../Constants/ProductsConstants";


//  FETCH_PRODUCTS

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});


export const fetchProducts = () => async (dispatch) => {

  try {
    dispatch(fetchProductsRequest());

    const response = await api.get('/product?skip=0&limit=90')

    dispatch(fetchProductsSuccess(response.data.data));
  }
  catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};



//  FETCH_PRODUCT_DETAILS

export const fetchProductDetailsRequest = () => ({
  type: FETCH_PRODUCT_DETAILS_REQUEST,
});

export const fetchProductDetailsSuccess = (product) => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

export const fetchProductDetailsFailure = (error) => ({
  type: FETCH_PRODUCT_DETAILS_FAILURE,
  payload: error,
});

export const fetchProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductDetailsRequest());

    const response = await api.get(`/product/${productId}/product`);
    console.log(response.data.data);
    const { comment } = response.data.data;
    console.log({ comment });
    dispatch(fetchProductDetailsSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchProductDetailsFailure(error.message));
  }
};



//  ADD_PRODUCT

export const addProductRequest = () => ({
  type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS,
});

export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch(addProductRequest());

    try {
      const response = await api.post('/product', productData);

      dispatch(addProductSuccess());
      dispatch(fetchProducts());

    } catch (error) {
      dispatch(addProductFailure(error.message));
    }
  };
};

//  EDIT_PRODUCTS
export const editProductRequest = () => ({
  type: EDIT_PRODUCT_REQUEST,
});

export const editProductSuccess = (productId) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: productId,
});

export const editProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const editProduct = (productId, updatedProductData) => async (dispatch) => {
  try {
    dispatch(editProductRequest());

    const response = await api.put(`/product/${productId}`, updatedProductData);

    dispatch(editProductSuccess(response.data.data));
  } catch (error) {
    dispatch(editProductFailure(error.message));
  }
};

//  DELETE_PRODUCTS
export const deleteProductSuccess = (productId) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: productId,
});

export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      await api.delete(`/product/${productId}`);
      const { products } = getState().products;
      const updatedProducts = products.filter((product) => product._id !== productId);
      dispatch(deleteProductSuccess(updatedProducts));
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  };
};


// ADD COMMENT 

export const addCommentSuccess = (product) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: product,
});

export const addCommentFailure = (error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});

export const addComment = (productId, comment) => async (dispatch) => {
  try {
    const response = await api.post(`/comment`, { productId, comment });
    console.log(response.data.data);
    dispatch(addCommentSuccess(response.data.data));
  } catch (error) {
    dispatch(addCommentFailure(error.message));
  }
};


// DELETE COMMENT 


export const deleteCommentSuccess = (productId, commentId) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: { productId, commentId },
});

export const deleteCommentFailure = (error) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error,
});

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await api.delete(`/comment/${commentId}`);
    dispatch(deleteCommentSuccess(commentId));
  } catch (error) {
    dispatch(deleteCommentFailure(error.message));
  }
};


// // EDIT COMMENT 

// export const editCommentRequest = () => ({
//   type: EDIT_COMMENT_REQUEST,
// });

// export const editCommentSuccess = (comment) => ({
//   type: EDIT_COMMENT_SUCCESS,
//   payload: comment,
// });

// export const editCommentFailure = (error) => ({
//   type: EDIT_COMMENT_FAILURE,
//   payload: error,
// });

// export const editComment = (commentId, updatedText) => async (dispatch) => {
//   try {
//     dispatch(editCommentRequest());
//     const response = await api.put(`/comment/${commentId}`, { comment: updatedText });
//     dispatch(editCommentSuccess(response.data.data));
//   } catch (error) {
//     dispatch(editCommentFailure(error.message));
//   }
// };




// ADD TO CART

export const addToCartSuccess = (product) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: product,
});

export const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const addToCart = (product) => async (dispatch) => {
  try {
    const response = await api.post('/order', { product });
    console.log(response.data.data);
    // Dispatch the success action
    dispatch(addToCartSuccess(response.data.data));
  } catch (error) {
    // Dispatch the failure action
    dispatch(addToCartFailure(error.message));
  }
};
