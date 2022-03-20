import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/Add.module.css';

const Edit = ({setClose,modalOpt,products,setProductList}) => {
    const [title,setTitle] = useState(modalOpt.title);
    const [desc,setDesc] = useState(modalOpt.desc);
    const [img,setImg] = useState(modalOpt.img);
    const [prices,setPrices] = useState(modalOpt.prices);
    const [extraOptions,setExtraOptions] = useState(modalOpt.extraOptions);
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

    const handleEdit = async () => {
        const data = new FormData();
        if (typeof(img)==='object') {
            data.append('file',img);
            data.append('upload_preset','uploads')
        }
         try {
            let newProduct

            if (typeof(img)==='object') {
                const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dpqtwugk5/image/upload',data);
                const {url} = uploadRes.data;
                newProduct = {title,desc,prices,img:url,extraOptions};
            }else{
                newProduct = {title,desc,prices,img,extraOptions};
            }
            const editRes = await axios.put('http://localhost:3000/api/products/'+modalOpt._id,newProduct);
            const newProductList = products.filter(product => product._id !== modalOpt._id);
            setProductList([...newProductList,editRes.data]);
            setClose(true);
         } catch (error) {
             console.log(error);
         }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={()=>setClose(true)} className={styles.close}>X</span>
                <h1>Edit Product</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose Product Image</label>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} className={styles.input}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Description</label>
                    <textarea type="textarea" defaultValue={desc} rows={4} onChange={(e) => setDesc(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        defaultValue={prices[0]}
                        placeholder="Small" 
                        onChange={(e) => changePrice(e,0)}

                        />
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        defaultValue={prices[1]}
                        placeholder="Medium" 
                        onChange={(e) => changePrice(e,1)}

                        />
                        <input className={`${styles.input} ${styles.inputSm}`} 
                        type="number" 
                        defaultValue={prices[2]}
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
                <button className={styles.createButton} onClick={handleEdit}>Edit</button>
            </div>
        </div>
    );
};

export default Edit;