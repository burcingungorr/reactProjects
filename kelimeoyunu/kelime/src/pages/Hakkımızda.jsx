import React from 'react';
import Header from '../component/Header';
import Form from '../component/Form';
import Footer from '../component/Footer';
import Abouttext from '../component/Abouttext';



const Hakkımızda = () => {
  return (
    <div style={{overflowX:"hidden"}}>
      <Header />
      <Abouttext/>
      <Form/>
      <Footer/>

    </div>
  );
};

export default Hakkımızda;
