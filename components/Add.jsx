import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Add.module.css';

const Add = ({setClose}) => {
    const [title,setTitle] = useState(null);
    const [desc,setDesc] = useState(null);
    const [img,setImg] = useState(null);
    const [prices,setPrices] = useState([]);
    const [extraOptions,setExtraOptions] = useState([]);
    const [extra,setExtra] = useState({});

    const changePrice = (e,index) => {
        const currentPrice = [...prices];
        currentPrice[index] = e.target.value;
        setPrices(currentPrice);
        
    }

    const handleExtraInput = (e) => {
        const {name,value} = e.target;
        setExtra({...extra,[name]:value}); 
    }

    const handleExtra = () => {
        setExtraOptions((prev)=>[...prev,extra])
    }

    const handleDelete = (index) => {
        const currentExtraOptions = [...extraOptions];
        currentExtraOptions.splice(index, 1);
        setExtraOptions(currentExtraOptions);
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append('file',img);
        data.append('upload_preset','uploads')
         try {
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dpqtwugk5/image/upload',data);
            const {url} = uploadRes.data;
            const newProduct = {title,desc,prices,img:url,extraOptions};
            await axios.post(process.env.BASE_URL+'api/products',newProduct);
            setClose(true);
         } catch (error) {
             console.log(error);
         }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={()=>setClose(true)} className={styles.close}>X</span>
                <h1>Add a New Product</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose Product Image</label>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className={styles.input}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Description</label>
                    <textarea type="textarea" rows={4} onChange={(e) => setDesc(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        placeholder="Small" 
                        onChange={(e) => changePrice(e,0)}

                        />
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        placeholder="Medium" 
                        onChange={(e) => changePrice(e,1)}

                        />
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        placeholder="Large" 
                        onChange={(e) => changePrice(e,2)}

                        />
                    </div>
                </div>
    
                <div className={styles.item}>
                    <label className={styles.label}>Extras</label>
                    <div className={styles.extra}>
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="text" 
                        placeholder="Item" 
                        name="text" 
                        onChange={(e) => handleExtraInput(e)}

                        />
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        placeholder="Price" 
                        name="price" 
                        onChange={(e) => handleExtraInput(e)}

                        /> 
                        <button className={styles.extraButton} onClick={handleExtra}>Add</button>
                    </div>

                    <div className={styles.extraItems}>
                        {extraOptions.map((options,i) =>(
                            <div className={styles.extraItem} key={i}>
                                <span className={styles.cross} onClick={() => handleDelete(i)}>X</span>
                                <span className={styles.extraText}>{options.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className={styles.createButton} onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default Add;