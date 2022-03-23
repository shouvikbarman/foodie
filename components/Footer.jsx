import styles from '../styles/Footer.module.css'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return <div className={styles.container}>
        <div className={styles.item}>
            <Image src='/img/resturant-background.jpg' alt="about background image" layout='fill' />
        </div>
        <div className={styles.item}>
            <div className={styles.card}>
                <h2 className={styles.motto}>Never a good time to be hungry</h2>
            </div>
            <div className={styles.card}>
                <h1 className={styles.title}>FIND OUR RESTURANT</h1>
                <p className={styles.text}>IN MIDDLE OF NOWHERE</p>
            </div>
            <div className={styles.card}>
                <h1 className={styles.title}>WORKING HOURS</h1>
                <p className={styles.text}>
                    MONDAY-FRIDAY <br/>
                    9:00-22:00
                </p>
                <p className={styles.text}>
                    SATURDAY-SUNDAY <br/>
                    12:00-24:00
                </p>
            </div>
            <Link href='/admin' passHref>
                <span className={styles.admin}>Admin</span>
            </Link>
        </div>
    </div>
};

export default Footer