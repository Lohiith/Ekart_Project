import React, { Fragment } from "react";

export default function Cart({ cartItems, setCartItems }) {

    // simple totals for beginners (no reduce)
    let subtotalUnits = 0;
    let estTotal = 0;
    for (const item of cartItems) {
        const price = Number(item.product.price) || 0;
        const qty = Number(item.qty) || 0;
        subtotalUnits += qty;
        estTotal += price * qty;
    }

    function increaseQty(productId) {
        // increase qty but don't exceed stock
        setCartItems((state) =>
            state.map((it) => {
                if (it.product._id !== productId) return it;
                
                const maxQty = it.product.stock || it.qty + 1;
                if (it.qty < maxQty) {
                    return { ...it, qty: it.qty + 1 };
                }
                return it;
            })
        );
    }

    function decreaseQty(productId) {
        // decrease qty but don't go below 1
        setCartItems((state) =>
            state.map((it) => {
                if (it.product._id !== productId) return it;
                
                if (it.qty > 1) {
                    return { ...it, qty: it.qty - 1 };
                }
                return it;
            })
        );
    }

    function removecartitem(id) {
        // remove the item from cart
        setCartItems((state) => state.filter((item) => item.product._id !== id));
    }

    return <div className="container container-fluid">
        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {cartItems.map((item) => {
                    const imageUrl = `/images/products/${item.product.imageIndex}.jpg`;
                    return (
                <Fragment key={item.product._id}>
                    <hr />
                    <div className="cart-item">
                        <div className="row">
                            <div className="col-4 col-lg-3">
                                <img src={imageUrl} alt={item.product.name} height="90" width="115"/>
                            </div>

                            <div className="col-5 col-lg-3">
                                <a href="#">{item.product.name}</a>
                            </div>


                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p id="card_item_price">${item.product.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product._id)}>-</span>
                                    <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item.product._id)}>+</span>
                                </div>
                            </div>

                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removecartitem(item.product._id)}></i>
                            </div>

                        </div>
                    </div>
                </Fragment>
                    );
                })}
                
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{subtotalUnits} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${estTotal.toFixed(2)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block">Place Order</button>
                </div>
            </div>
        </div>
    </div>
}
