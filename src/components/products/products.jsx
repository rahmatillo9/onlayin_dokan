import React, { useState } from "react";
import ProductCard from "./product-card";
import ProductModal from "./product-modal";

const Products = ({ products, loading }) => {
  const [productModal, setProductModal] = useState(null); 
  const [visible, setVisible] = useState(5); 

  const modalHandler = (product) => {
    setProductModal(product); 
  };

  const closeModal = () => {
    setProductModal(null); 
  };

  const showMore = () => {
    setVisible((prev) => prev + 5); 
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div
        className="
          grid 
          gap-5 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5"
      >
        {!loading && products && products.length > 0 ? (
          products.slice(0, visible).map((p) => (
            <ProductCard
              modalHandler={modalHandler}
              key={p.id}
              product={p}
            />
          ))
        ) : !loading ? (
          <h1 className="text-5xl text-center my-10 text-gray-300">
            Products not found
          </h1>
        ) : (
          <div className="text-center text-5xl text-gray-400 py-20">
            <i className="fa fa-circle-notch fa-spin"></i>
          </div>
        )}
      </div>

      {productModal && (
        <ProductModal
          closeModal={closeModal}
          productID={productModal.id} 
        />
      )}

      {products && visible < products.length && (
        <div className="py-10 text-center">
          <button
            type="button"
            onClick={showMore} 
            className="
              text-white 
              translate-all 
              bg-gradient-to-br 
              from-green-400 
              to-blue-600 
              hover:bg-gradient-to-bl 
              focus:ring-4 
              focus:outline-none 
              focus:ring-green-200 
              dark:focus:ring-green-800 
              font-medium 
              rounded-lg 
              text-sm 
              px-5 
              py-2.5 
              text-center 
              me-2 
              mb-2"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
