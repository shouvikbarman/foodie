import React from 'react';
import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

function ProductList({productList}) {
  return <div className={styles.container}>
      <h1 className={styles.title}>Best Food in town</h1>
      <p className={styles.desc}>lorem ipsum dolor sit amet, consectetur adipiscing elit
      , sed diam nonumy eirmod tempor incididunt
      </p>
      <div className={styles.wrapper}>
          {productList.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
      </div>
  </div>;
}

export default ProductList;
