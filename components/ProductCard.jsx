import React from 'react';
import styles from '../styles/ProductCard.module.css'
import Image from 'next/image';
import Link from 'next/link';

function ProductCard({product}) {
  return ( 
  <div className={styles.container}>
    <Link href={`/product/${product._id}`} passHref>
      <Image src={product.img} alt='product image' height='300' width='300' objectFit='contain'/>
    </Link>
    <h1 className={styles.title}>{product.title}</h1>
    <span className={styles.price}>${product.prices[0]}</span>
    <p className={styles.desc}>{product.desc}</p>
  </div> );
}

export default ProductCard;
