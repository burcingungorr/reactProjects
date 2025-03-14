import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import Form from './component/Form'
import Content from './component/Content'
import Footer from './component/Footer'
import ToDo from './component/ToDo'

function App() {

  return (
    <>
   <section className='todoapp'>
<Header/>
<Form/>
<Content/>
<ToDo/>
<Footer/>
   </section>
    </>
  )
}

export default App
