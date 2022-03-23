import styles from '../../styles/Login.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await axios.post(process.env.BASE_URL+'api/login', {username,password});
            router.push('/admin');
        } catch (error) {
            setError(true);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <input className={styles.input} type="text" 
                    placeholder="UserName" onChange={(e)=>setUsername(e.target.value)}/>
                <input className={styles.input} type="password" 
                    placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleLogin} className={styles.button}>Sign In</button>
                {error && <span className={styles.error}>Wrong Credentials!</span> }
            </div>
        </div>
    )
}

export default Login;