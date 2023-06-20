import React from 'react'
import { useState, useEffect } from 'react'
import { fetchProducts } from '../Redux/Action/ProductsAction'
import { useDispatch, useSelector } from 'react-redux'

function Dashboard() {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    

    if (loading) {
        return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='container'>
            <div className="row">
                <div className="table-responsive">
                    <div className="col-lg-12">
                        <h1 className='text-center'>Products</h1>
                        <div className="search-bar">
                            <input type="text" placeholder="Search anything.." />
                        </div>
                        <div className="py-4">
                            <table className='table'>

                                <thead>
                                    <tr>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Category</th>
                                        <th scope='col'>Price</th>
                                        <th scope='col'>Image</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products && products.map((product,i) => (
                                        <tr key={i}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td><img style={{ width: '45px', height: '45px' }} src={product.image} alt='' /></td>
                                            <td><button className='btn btn-success'>Edit</button></td>
                                            <td><button className='btn btn-danger'>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
