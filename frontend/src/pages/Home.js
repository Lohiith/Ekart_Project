import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Productcard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const searchString = searchParams.toString();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products?${searchString}`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error(err));
  }, [searchString]);

  return (
    <Fragment>
      <h1 className="text-center">Latest Products</h1>

      <section className="container mt-5">
        <div className="row justify-content-center">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <h3>No products found</h3>
          )}
        </div>
      </section>
    </Fragment>
  );
}
