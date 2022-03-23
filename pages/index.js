import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Featured from '../components/Featured'
import ProductList from '../components/ProductList'
import Add from '../components/Add'
import AddButton from '../components/AddButton'


export default function Home({productList,admin}) {
  const [close,setClose] = useState(true);
  return (
    <div >
      <Head>
        <title>Pizza restaurant</title>
        <meta name="description" content="Best pizza place in universe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured/>
      {admin && <AddButton setClose={setClose}/>}
      <ProductList productList={productList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  );
};

export const getServerSideProps = async(context) => {

  const myCookies = context.req?.cookies || '';
  let admin = false;

  if(myCookies.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(process.env.BASE_URL + 'api/products')
  return {
    props: {
      productList: res.data,
      admin
    },
  };
};
