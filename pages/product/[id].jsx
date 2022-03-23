import React, {useState} from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../redux/cartSlice'

const Product= ({product}) => {
    const dispatch = useDispatch();
    const [price,setPrice] = useState(product.prices[0]);
    const [index,setIndex] = useState(0);
    const [extras,setExtra] = useState([]);
    const [quantity,setQuantity] = useState(1)

    const handleSize = (sizeIndex) => {
        setPrice(price+(product.prices[sizeIndex]-product.prices[index]));
        setIndex(sizeIndex);
    };

    const handleExtra = (e,option) => {
        let checked = e.target.checked;
        if (checked) {
            setPrice(price+option.price);
            setExtra([...extras,option]);
        }else{
            setPrice(price-option.price);
            setExtra(extras.filter((extra)=> extra._id !== option._id));
        };
    };

    const handleClick = () => {
        dispatch(addProduct({...product,price,extras,quantity}));
    };
    
    return <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.imgContainer}>
            <Image src={product.img} alt= 'product image' layout= 'fill' objectFit='contain'/>
        </div>
        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{product.title}</h1>
            <span className={styles.price}>${price}</span>
            <p className={styles.desc}>{product.desc}</p>
            <h2 className={styles.choose}>Choose the size</h2>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={() => handleSize(0)}>
                    <Image src='/img/pizza-size.png' alt='product size' layout= 'fill'/>
                    <span className={styles.number}>Small</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(1)}>
                    <Image src='/img/pizza-size.png' alt='product size' layout= 'fill'/>
                    <span className={styles.number}>Medium</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(2)}>
                    <Image src='/img/pizza-size.png' alt='product size' layout= 'fill'/>
                    <span className={styles.number}>Large</span>
                </div>
            </div>

            <h3 className={styles.choose}>Choose additional ingredients</h3>
            <div className={styles.ingredients}>
            {product.extraOptions.map(option =>(
                <div className={styles.option} key={option._id}>
                    <input 
                        type="checkbox"
                        name={option.text}
                        id={option.text}
                        className={styles.checkbox}
                        onChange={(e)=>handleExtra(e,option)}
                    />
                    <label htmlFor={option.text}>{option.text}</label>
                </div>
            ))}
            </div>

            <div className={styles.add}>
                <input type='number' defaultValue={1} min='1' className={styles.quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                <button className={styles.button} onClick={handleClick}>Add to cart</button>
            </div>
        </div>
    </div>;
};

export const getServerSideProps = async({params}) => {
  const res = await axios.get(`${process.env.BASE_URL}api/products/${params.id}`);
  return {
    props: {
      product: res.data
    },
  };
};

export default Product;