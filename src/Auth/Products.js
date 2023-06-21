import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { fetchProducts, addProduct, deleteProduct } from '../Redux/Action/ProductsAction';
import { incrementCart } from '../Redux/Action/cartAction';

import { Link } from 'react-router-dom';

const Products = () => {

  const dispatch = useDispatch();
  const [fileImage, setFileImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [showEditPopup, setShowEditPopup] = useState(false);

  const [editname, setEditName] = useState('');
  const [editprice, setEditPrice] = useState('');
  const [editcategory, setEditCategory] = useState('');
  const [editdescription, setEditDescription] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(fetchProducts());
      })
      .catch((error) => {
        console.log('Error deleting product:', error);
      });
  }

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handleEdit = () => {
    console.log('edit clicked');

    
    setShowEditPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowEditPopup(false)
  };

  const handleSaveChanges = () => {
    if (fileImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        const productData = {
          name,
          category,
          price,
          description,
          image: base64Image,
        }
        dispatch(addProduct(productData));

      }
      reader.readAsDataURL(fileImage);
    }


  }

  const handleFile = (event) => {
    const file = event.target.files[0];
    setFileImage(file);
  }

  if (loading) {
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (

    <div className="container">
      <h1 className='text-center mt-3'>Products</h1>

      <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
      <div className="row row-cols-md-2">
        {products && products.map((product) => (
          <div key={product._id} className="col" style={{ width: '18rem' }}>
            <div className="card scale-up shadow-lg p-3 mb-5 bg-white rounded m-2" >

              <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} className='card-img-top centered-image' />

              <div className="card-body">
                <p className="card-title">{product.name}</p>
                <p className="card-text"><strong>&#8377; {product.price}</strong></p>
                <div className="row float-right">
                  <Link to={`/viewproduct/${product._id}`} className='col btn fs-5 bi bi-eye'></Link>
                  {/* <div className='col btn fs-5 bi-cart' onClick={handleCart}></div> */}
                  <div className='col btn fs-5 bi-pencil-square' onClick={handleEdit}></div>
                  <div className='col btn fs-5 bi-trash3' onClick={() => handleDelete(product._id)}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="modal d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add A Product</h5>
                <button type="button" className="btn-close" onClick={handleClosePopup} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type='text' name="category" value={category} onChange={(e) => setCategory(e.target.value)} className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" tabIndex="4"
                      placeholder="Write Description.."></textarea>
                  </div>
                  <div className="mb-2">
                    <input type="file" name="file" accept='image/*' onChange={handleFile} className='form-control' />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="modal d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={handleClosePopup} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <input type="text" name='name' placeholder='Enter Name' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type='text' name="category" placeholder='Enter Category' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input type="number" name="price" placeholder='Enter Price' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <textarea name="description" className="form-control" tabIndex="4" placeholder="Write Description.."></textarea>
                  </div>
                  <div className="mb-2">
                    <input type="file" name="file" accept='image/*' onChange={handleFile} className='form-control' />
                  </div>
                </form>
              </div>
              <div className="modal-footer">

                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default Products;