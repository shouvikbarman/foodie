import Image from 'next/image';
import styles from '../styles/Navbar.module.css'
import {useSelector} from 'react-redux'
import Link from 'next/link';

const Navbar = () => {

    const quantity = useSelector(state=>state.cart.quantity)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image className={styles.callButton} src='/img/callbutton.png' alt='call button' height='32' width='32' />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!!!</div>
                    <div className={styles.text}>123-456789</div>
                </div>
            </div>
            
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href='/' passHref>
                        <li className={styles.listItem}>Homepage</li>
                    </Link>
                    <li className={styles.listItem}>Products</li>
                    <li className={styles.listItem}>Menu</li>
                    <Link href='/' passHref>
                        <Image  src='/img/logo.png' alt='logo' height='100px' width='100px'/>
                    </Link>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
            </div>
            <Link href='/cart' passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src='/img/cart.png' alt='cart logo' height='32px' width='32px'/>
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default Navbar