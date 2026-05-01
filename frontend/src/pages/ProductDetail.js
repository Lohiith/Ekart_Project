import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail({ cartItems, setCartItems }) {
  const { id } = useParams();   // ✅ correct destructuring
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const imageUrl = `/images/products/${product.imageIndex}.jpg`;

  function addtocart () {
    const found = cartItems.find((item) => item.product._id === product._id);
    if(!found) {
    const newItem = {product, qty}
    setCartItems((state) => [...state, newItem]);
}
    else alert("Item already in cart");
    }

    function increaseQty() {
        if(product.stock == qty) return;
        setQty((state) => state + 1);
    }

    function decreaseQty() {        if(qty == 1) return;
        setQty((state) => state - 1);
    }
    


  return (

    <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={imageUrl} alt={product.name} height="500" width="500"/>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                    <div className="rating-inner"></div>
                </div>
           

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus"onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button type="button" onClick={addtocart} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />

                <p>Status: <span id="stock_status">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                <div className="rating w-50"></div>
						
            </div>

        </div>
                    
    </div>
  );
}    