import styles from '../styles/Featured.module.css'
import Image from 'next/image';
import { useState } from 'react';

const Featured = ()=>{ 
    
    const [index,setIndex] = useState(0);

    const images = [
    '/img/featured1.png',
    '/img/featured2.png',
    '/img/featured3.png'
    ]

    const handleClick = (direction) => {
        if (direction === 'left') {
            setIndex(index !== 0 ? index-1 : 2)
        }else{
            setIndex(index !== 2 ? index+1 : 0)
        }

    }


    return ( <div className={styles.container}>
      <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleClick('left')}>
          <Image src='/img/left_arrow.png' alt='left slider arrow' layout='fill' objectFit='contain' />
      </div>
      
      <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
              {images.map((img,i) => (
                  <div className={styles.imgContainer} key={i}>
                    <Image src={img}  alt='featured items' layout='fill' objectFit='contain'/>
                  </div>
              ))}
      </div>

      <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleClick('right')}>
          <Image src='/img/right_arrow.png' alt='right slider arrow' layout='fill' objectFit='contain' />
      </div>
      
    </div> );
};

export default Featured;
