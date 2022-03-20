import styles from '../styles/Add.module.css';

const AddButton = ({setClose}) => {
    return (
        <div className={styles.mainAddbutton} onClick={()=>setClose(false)}>Add New Pizza</div>
    );
};

export default AddButton;