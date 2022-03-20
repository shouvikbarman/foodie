import styles from '../styles/Userinfo.module.css'
import {useState} from 'react'
import axios from 'axios';

const Userinfo = ({cross,handleContinue,setUserData}) => {

    const [name,setName] = useState('');
    const [phone,setPhone] = useState();
    const [address,setAddress] = useState('');
    const [user,setUser] = useState(false);

    const FindUser = async () => {
        try {
            if(phone.length<10){
                alert('Please enter correct phone number');
            }else{
                const res = await axios.get('http://localhost:3000/api/user',{params:{phone:phone}})
                if (!res.data) {
                    setUser(true);
                }else {
                    setUserData(res.data);
                    handleContinue()
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const CreateUser = async () => {
        try {
            const data = {name,phone,address};
            const res = await axios.post('http://localhost:3000/api/user',data);
            setUserData(res.data);
            handleContinue()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span className={styles.crossButton} onClick={()=>cross(false)}>X</span>

                {
                    !user ? <div className={styles.item}>
                    <label className={styles.label}>Phone</label>
                    <input type="number" 
                        className={styles.input} 
                        onChange={(e)=> setPhone(e.target.value)}
                        placeholder='Your Number'/>
                    </div> 
                
                    :

                    <div>
                        <div className={styles.item}>
                            <label className={styles.label}>Name</label>
                            <input type="text" 
                                className={styles.input} 
                                placeholder='Your Name' 
                                onChange={(e)=> setName(e.target.value)} 
                                required/>
                        </div>

                        <div className={styles.item}>
                            <label className={styles.label}>Address</label>
                            <textarea rows={7}  
                                onChange={(e)=> setAddress(e.target.value)}
                                placeholder='Your full address'/>
                        </div>
                    </div>
                }
                <button className={styles.button} 
                    onClick={() => {!user ? FindUser() : CreateUser()} }>
                    Continue...
                </button>
            </div>
        </div>
    )
}

export default Userinfo;