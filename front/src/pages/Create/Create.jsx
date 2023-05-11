import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Button from '../../components/ui/Button/Button'

import styles from './Create.module.css'
import style from './../Home/Home.module.css'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import Product from '../../components/Product/Product'


const Create = () => {
  const [category, setCategory] = useState(localStorage.getItem('CategoryType')? localStorage.getItem('CategoryType'): 'machina')
  const {isAuth, tokenAuth} = useAuth()
  const [content, setContent] = useState([])
  const category__list = ['motherboards', 'processors', 'rammemories', 'power_supplies', 'storagedevices', 'graphiccards']
  const [error, setError] = useState()

  // Massive for create machine
  const [machine, setMachine] = useState({
    motherboards: {}, 
    processors: {}, 
    rammemories: {},
    rammemories_count: 0,
    power_supplies: {},
    graphiccards: {},
    storagedevices: {},
  })

  useEffect(() => {
    sortFunction(category) // auto category loading
    document.title = 'Create' // retitle
  }, [])

  // ! show value when u selected some resuls and write in localStorage
  const categoryShow = (e) => {
    sortFunction(e.target.value)
    
    localStorage.setItem('CategoryType', e.target.value)
    setCategory(e.target.value)
  }

  // ! sort by category
  const sortFunction = (cat) => {
    axios.get(`http://127.0.0.1:8000/api/search?category=${cat}&q=I`, {
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tokenAuth}`
      }
    }).then((res) => {
        setContent(res.data)
      })
  }

  // ! Input Change
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setMachine(preValues => ({
      ...preValues, [name]: value
    }))
  }

  // ! Drag and drop
  const handleDragStart = (e, product) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product))
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault()
    const {name} = e.target
    console.log(name, category)
    if (name  === category) {
      let product = e.dataTransfer.getData('text')
      console.log(product)

      setMachine(preValues => ({
        ...preValues, [name]: JSON.parse(product)
      }))

    } else {
      e.target.className = 'textarea__error'
      setError(`You can't put ${category} in ${name}`)
      
      setTimeout(() => {
        e.target.className = ''
      }, 1000)
    }

  }

  // !  Add New Machine
  const create = () => {
    console.log(machine)
  }

  return (
    <Layout >
      <div className={styles.create} >
        <div className={styles.create__header}>
          <h3>Add A New Car</h3>
          {error?<div className={styles.error}>{error}</div>: <></>}
          <Button onClick={create} >Save</Button>
        </div>
      </div>
      <div className={styles.create__body}>
        <div className={styles.create__body__right}>
          <select name="" id="" onChange={categoryShow} value={category}>
            <option value="" disabled selected>Choose Object</option>
            {category__list.map(category__list => 
              <option key={category__list.id}  value={category__list}>{category__list}</option>  
            )}
          </select>
          <div className={styles.create__body__right__elements}>
          {content? (
          <div className={style.products}>
            {content.map((product, item) => 
                <div key={product.id} className={styles.product} draggable onDragStart={(e) => handleDragStart(e, product)}>
                  <img src={`http://127.0.0.1:8000/images/${product.imageUrl}.png`} alt="" draggable={false} />
                  <div className={styles.product__item} draggable={false} >
                    <a href="" draggable={false}>{product.id}. {product.name}</a>
                    <div className={styles.product__notification} >
                      <h5>{product.name}</h5>
                      <h3> {product.brandId? (<>Brand: {product.brandId}</>) :( <></> ) }</h3>
                  </div>
                  </div>
                </div>
            )}
          </div>
        )
        : (<div>Not Fount, Bro...</div>)}
          </div>
        </div>
        <form className={styles.create__body__left}>

          {/* motherboard */}
          <div className={styles.card} >
            <div className={styles.card__header}>
              <h3>MotherBoard</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div   className={styles.card__body}  >
                  <textarea name="motherboards" onDragOver={handleDragOver} onDrop={handleDrop} ></textarea>
             {machine.motherboards ? (
                <Product product={machine.motherboards} />
             ): <></>}
            <h2>+</h2> 
            </div>
          </div>

            {/* processor */}
          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Processor</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
            <textarea 
                name='processors' 
                // onChange ={handleInputChange} 
                // value={machine.processors}
                onDragOver={handleDragOver} onDrop={handleDrop}
             ></textarea>
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Memory Ram</h3>
              <input 
                type="number" 
                name='rammemories_count' 
                placeholder='count...' 
                // onChange={handleInputChange} 
                onDragOver={handleDragOver} onDrop={handleDrop}
                // value={machine.rammemories.count}  
              />
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
            <textarea 
                name='rammemories' 
                // onChange ={handleInputChange} 
                onDragOver={handleDragOver} onDrop={handleDrop}
                // value={machine.rammemories}
             ></textarea>
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Power Supplies</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
             <textarea
                name='power_supplies' 
                // onChange ={handleInputChange} 
                onDragOver={handleDragOver} onDrop={handleDrop}
                // value={machine.power_supplies}
             ></textarea>
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Graphic Card</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
             <textarea
                name='graphiccards' 
                // onChange ={handleInputChange} 
                onDragOver={handleDragOver} onDrop={handleDrop}
                // value={machine.graphiccards}
             ></textarea>
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Other Deviceses</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
             <textarea></textarea>
              <h2>+</h2>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Create