import axios from 'axios'
import Image from 'next/image'
import styles from '../../styles/Admin.module.css'
import Edit from '../../components/Edit'
import {useState} from 'react'

const Index = ({orders,products}) => {

    const [productList,setProductList] = useState(products);
    const [orderList,setOrderList] = useState(orders);
    const [close,setClose]  = useState(true);
    const [modalOpt,setModalOpt] = useState(null)
    const status = ['Preparing','On The Way','Delivered'];

    const handleEdit =(product) => {
        setClose(false);
        setModalOpt(product)
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(process.env.BASE_URL+'/api/products/' + id)
            setProductList(products.filter(product => product._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = async (id) => {

        const currentStatus = orderList.filter(order => order._id === id)[0].status;

        try {
            const res = await axios.put(process.env.BASE_URL+'api/orders/' + id,{status:currentStatus+1})
            setOrderList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <><div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>

                    {productList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image src={product.img} width='50' height='50' objectFit='fit' alt='featured1' />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleEdit(product)}>Edit</button>
                                    <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>

            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>

                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 5)}...</td>
                                <td>{order.customer}</td>
                                <td>{order.total}</td>
                                <td>{order.method === 0 ? <span>COD</span> : <span>Paid</span>}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    {
                                        order.status<2 && 
                                        <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>
        </div>{!close && <Edit 
                            setClose={setClose} 
                            modalOpt={modalOpt} 
                            setProductList={setProductList} 
                            products={products}
                        />}</>
    )
}

export const getServerSideProps = async (context) => {
    const mycookies = context.req?.cookies || '';

    if (mycookies.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
    const productRes = await axios.get(process.env.BASE_URL+'api/products')
    const orderRes = await axios.get(process.env.BASE_URL+'api/orders')

    return {
        props:{
            orders:orderRes.data,
            products:productRes.data,
        }
    }
}

export default Index