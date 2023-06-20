import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { addToCart } from '../Redux/Action/ProductsAction';
import { useDispatch } from 'react-redux';
import img from '../Auth/order.png'

function Cart() {
  const getCartItems = JSON.parse(localStorage.getItem('cart'));
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(getCartItems);
  const [showPopup, setShowPopup] = useState(false);

  const handleIncrement = (productId) => {
    const updatedCartItems = getCartItems.map(item => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = getCartItems.map(item => {
      if (item._id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  console.log(getCartItems);

  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckOut = () => {
    // const requestBody = [{
    //   product: cartItems.map(item => ({
    //     productId: item.productId,
    //     quantity: item.quantity,
    //   }))
    // }];

    const product = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));
    dispatch(addToCart(product));
    setShowPopup(true);
  }
  return (

    <section className="h-100 h-custom" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                      </div>
                      <hr className="my-4" />

                      {
                        cartItems && cartItems.map((product) => (
                          <div div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={product.image}
                                className="img-fluid rounded-3" alt="" />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{product.category}</h6>
                              <h6 className="text-black mb-0">{product.name}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button className="btn btn-link px-2" onClick={() => handleDecrement(product._id)}>
                                <i className="bi bi-dash-lg text-dark"></i>
                              </button>

                              <input name="quantity" value={product.quantity || 1} type="text"
                                className="form-control form-control-sm" readOnly />

                              <button className="btn btn-link px-2" onClick={() => handleIncrement(product._id)}>
                                <i className="bi bi-plus-lg text-dark"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">&#8377;{product.price}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a href="#!" className="text-muted"><i className="bi bi-x-lg"></i></a>
                            </div>
                            <hr className="my-4" />
                          </div>
                        ))}



                      <div className="pt-5">
                        <Link to='/products' className="mb-0"><a href="#!" className="text-body"><i
                          className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4" style={{ backgroundColor: '#eae8e8' }}>
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="select">
                          <option value="1">Standard-Delivery- €5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Give code</h5>

                      <div className="mb-5">
                        <div className="form-outline">
                          <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                          <label className="form-label" for="form3Examplea2">Enter your code</label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>&#8377; {totalPrice.toFixed(2)}</h5>
                      </div>

                      <button type="button" className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark" onClick={handleCheckOut}>Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="modal d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered model-confirm" role="document">
            <div className="modal-content">

              <div className="mode-header border-0">
                <button type="button" style={{float:'right'}} className=" btn rounded-5 m-2 bg-dark text-white shadow-none" data-bs-dismiss="modal"
                   onClick={()=> setShowPopup(false)}>X</button>
              </div>

              <div className="model-body">
                <div className="text-center">
                  <div className="d-flex justify-content-center pb-2">
                    <div className="d-flex justify-content-center align-items-center rounded-pill">
                      <img src={img} alt='' style={{ width: '150px', height: '150px' }} />
                    </div>
                  </div>
                  <h5 class="fw-bold">Your order has been placed </h5>
                  <p >Sit back and relax as your <br /> product is on it's way!</p>
                </div>
              </div>

            </div>
          </div>
        </div>


      )
      }
    </section >

  )
}

export default Cart