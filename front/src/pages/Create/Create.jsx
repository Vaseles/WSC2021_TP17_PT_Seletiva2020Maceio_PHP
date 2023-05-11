import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Button from '../../components/ui/Button/Button'

import styles from './Create.module.css'
import style from './../Home/Home.module.css'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'


const Create = () => {
  const [category, setCategory] = useState(localStorage.getItem('CategoryType')? localStorage.getItem('CategoryType'): 'machina')
  const {isAuth, tokenAuth} = useAuth()
  const [content, setContent] = useState([])
  const category__list = ['motherboards', 'processors', 'rammemories', 'power_supplies', 'storagedevices', 'graphiccards']

  const [machine, setMachine] = useState([])

  useEffect(() => {
    sortFunction(category)
    document.title = 'Create'
  }, [])

  // show value when u selected some resuls and write in localStorage
  const categoryShow = (e) => {
    sortFunction(e.target.value)
    
    localStorage.setItem('CategoryType', e.target.value)
    setCategory(e.target.value)
  }

  // sort by category
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

  const create = () => {
    setMachine()
  }

  return (
    <Layout >
      <div className={styles.create} >
        <div className={styles.create__header}>
          <h3>Add A New Car</h3>
          <Button onClick={create} >Save</Button>
        </div>
      </div>
      <div className={styles.create__body}>
        <div className={styles.create__body__right}>
          <select name="" id="" onChange={categoryShow} value={category}>
            <option value="" disabled selected>Choose Object</option>
            {category__list.map(category__list => 
              <option value={category__list}>{category__list}</option>  
            )}
          </select>
          <div className={styles.create__body__right__elements}>
          {content? (
          <div className={style.products}>
            {content.map(product => 
                <div className={styles.product} draggable={true}>
                  <img src={`http://127.0.0.1:8000/images/${product.imageUrl}.png`} alt="" draggable={false} />
                  <div className={styles.product__item} draggable={false} >
                    <a href="" draggable={false}>{product.name}</a>
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
          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>MotherBoard</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text"   />
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Processor</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text"   />
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Memory Ram</h3>
              <input type="number" placeholder='count...'  />
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text" />
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Power Supplies</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text"   />
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Ram Memory</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text"   />
              <h2>+</h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__header}>
              <h3>Other Deviceses</h3>
              {/* <Button>delete</Button> */}
            </div>
            <div className={styles.card__body}>
              <input type="text"   />
              <h2>+</h2>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Create