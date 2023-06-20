import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, addComment, deleteComment } from '../Redux/Action/ProductsAction';
import { React, useEffect, useState } from 'react';
import { incrementCart } from '../Redux/Action/cartAction';
import { Button } from 'bootstrap';


const ViewProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);

  const [commentInput, setCommentInput] = useState('');
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const [replyInput, setReplyInput] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const cart = useSelector((state) => state.products.cart);
  console.log(selectedProduct, 'selectedProduct');
  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  //check if item is in cart
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const isItemInCart = cartItems.some((cartItem) => cartItem._id === selectedProduct.product);

  if (isItemInCart) {
    setIsInCart(true);
  }

  const handleCart = () => {
    cartItems.push(selectedProduct.product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch(incrementCart())
    setIsInCart(true); 
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(productId, commentInput));
    setCommentInput('');
  }

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
    console.log('handleDeleteComment');
  }
  const handleEditComment = () => {
    console.log('handleEditComment');
  }
  const handleReplyComment = () => {
    console.log('handleReplyComment');
    setShowReplyInput(true);
  };

  const handleCancelReply = () => {
    setSelectedCommentId(null);
    setShowReplyInput(false);
    setReplyInput('');
  };

  const handleAddReply = () => {
    if (replyInput) {
      setSelectedCommentId(null);
      setShowReplyInput(false);
      setReplyInput('');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card" key={selectedProduct.product._id}>
            <div className="row">
              <div className="col-md-6">
                <div className="images p-3">
                  <div className="text-center p-4">
                    <img src={selectedProduct.product.image} alt='' width="250" />
                  </div>
                  <div className="thumbnail text-center">
                    <img className='me-2' src={selectedProduct.product.image} alt='' width="90" />
                    <img src={selectedProduct.product.image} alt='' width="90" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      &larr;
                      <span className="ml-1 fs-5"> Back</span>
                    </div>
                  </div>
                  <div className="mt-4 mb-3">
                    <h5>{selectedProduct.product.name} </h5>
                    <div className="price d-flex flex-row align-items-center">
                      <span className="act-price">&#8377;{selectedProduct.product.price}</span>
                    </div>
                  </div>
                  <p className="about">{selectedProduct.product.description}</p>

                  <div className="cart mt-4 align-items-center">
                    {isInCart ? (
                      <button className='btn btn-danger mr-2 px-4' disabled>Added to Cart</button>
                    ) : (
                      <button className='btn btn-danger mr-2 px-4' onClick={handleCart}>Add to Cart</button>
                    )}
                    {/* <Link to={`/cart/${selectedProduct.product._id}`} className="btn btn-danger mr-2 px-4" onClick={handleCart}>Add to cart</Link> */}

                  </div>
                  <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                    <input type="text" name={commentInput} onChange={(e) => setCommentInput(e.target.value)} className="form-control me-2" placeholder="Add comment" />
                    <button className="btn btn-primary bi bi-send-fill" onClick={handleComment} type="submit"></button>
                  </div>
                  <h5>Comments</h5>

                  <hr className='opacity-50' />
                  {selectedProduct.comment && selectedProduct.comment.map((comment) => (
                    <div className='card p-2 bg-white rounded-0 m-2'>
                      <div key={comment.userId._id} className="d-flex justify-content-start">
                        <i className='bi bi-person-circle me-2'></i>
                        <p className='text-primary me-2 fw-bold'>{comment.userId.name}</p>
                        <p className='fw-bold'>{comment.comment}</p>
                      </div>
                      <div className='d-flex justify-content-start'>
                        <span className='text-secondary pe-auto link' onClick={() => handleDeleteComment(comment._id)}>Delete</span>
                        <i className="text-secondary fa-lg bi bi-dot me-1"></i>
                        <a href='' className='text-secondary pe-auto nav-link' onClick={handleEditComment}>Edit</a>
                        <i className="text-secondary fa-lg bi bi-dot"></i>
                        <span className='text-secondary pe-auto nav-link' onClick={() => handleReplyComment()}>Reply</span>
                      </div>

                      <div className="mt-3">
                        <input
                          type="text"
                          name={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          className="form-control me-2"
                          placeholder="Add reply"
                        />
                        <div className="d-flex justify-content-end mt-2">
                          <button className="btn btn-secondary me-2" onClick={handleCancelReply}>Cancel</button>
                          <button className="btn btn-primary" onClick={handleAddReply}>Add Reply</button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
