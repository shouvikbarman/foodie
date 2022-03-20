import styles from '../styles/cart.module.css';
import Image from 'next/image';
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PaytmButton from '../paytm/PaytmButton';
import Userinfo from '../components/Userinfo';
import axios from 'axios';
import {useRouter} from 'next/router'


const Cart = () => {
    
    const router = useRouter()
    const dispatch = useDispatch();
    const cart = useSelector((state) =>state.cart);
    const [open,setOpen] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const [userData,setUserData] = useState(false);

    const handleContinue = () => {
        setModalOpen(false);
        setOpen(true);
    }

    const handleCheckout = () => {
        if(cart.quantity === 0) {
            alert('Please put something in the cart');
        }else {
            setModalOpen(true);
        }
    }

    const createOrder = async () => {
    try {
        const data = {
            customer:userData.name,
            address:userData.address,
            total:cart.total,
            method:0
        } 
      const res = await axios.post('http://localhost:3000/api/orders',data);
      res.status === 201 && router.push('/orders/'+ res.data._id);
      dispatch(reset());
    } catch (err) {
      console.error(err);
    }
  }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                    <tr className={styles.trTitles}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </tbody>

                    <tbody>
                        {cart.products.map((product) =>
                        <tr className={styles.tr} key={product._id}>
                        <td>
                            <span>X</span>
                            <div className={styles.imgContainer}>
                                <Image src={product.img} alt='product image' layout='fill' objectFit='contain' />
                            </div>
                        </td>
                        <td>
                            <span className={styles.name}>{product.title}</span>
                        </td>
                        <td>
                            {product.extras.map((extra) => 
                            <span className={styles.extras} key={extra._id}>{extra.text}</span>
                            )}

                        </td>
                        <td>
                            <span className={styles.price}>${product.price}</span>
                        </td>
                        <td>
                            <span className={styles.quantity}>{product.quantity}</span>
                        </td>
                        <td>
                            <span className={styles.total}>${product.price * product.quantity}</span>
                        </td>
                    </tr>
                    )}
                </tbody>

                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        <h2 className={styles.title}>CART TOTAL</h2>
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>${cart.total}
                    </div>

                    {
                        open ? (<div className={styles.paymentMethod}>
                        <button className={styles.payButton}
                            onClick={createOrder}>CASH ON DELIVERY</button>
                        <PaytmButton userData={userData}/></div>) : 
                        (<button onClick={handleCheckout} 
                            className={styles.button}>CHECKOUT NOW</button>)
                    }

                </div>
            </div>
            {modalOpen && <Userinfo cross={setModalOpen} handleContinue={handleContinue} setUserData={setUserData} />}
        </div>
    )
}

export default Cart;