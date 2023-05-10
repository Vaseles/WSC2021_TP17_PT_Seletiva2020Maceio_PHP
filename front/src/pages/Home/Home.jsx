import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import styles from './Home.module.css'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState([])
  const [isHoverWindow, setIsHoverWindow] = useState(false)

  const {tokenAuth} = useAuth()

  useEffect(() => {
    sortFunction('machina')
    document.title = 'Home'
  }, [])

  const categoryShow = (e) => {
    sortFunction(e.target.value)
  }

  const sortFunction = (cat) => {
    axios.get(`http://127.0.0.1:8000/api/search?category=${cat}&q=I`, {
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tokenAuth}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setContent(res.data)
      })
  }

  const toCreate = () => {
    navigate('/create')
  }
  

  return (
    <Layout>
      <div className={styles.category}>
        <input type="submit" value='machina' onClick={categoryShow}   />
        <input type="submit" value='processors' onClick={categoryShow}  />
        <input type="submit" value='power_supplies'  onClick={categoryShow}  />
        <input type="submit" value='rammemories'  onClick={categoryShow}  />
        <input type="submit" value='storagedevices' onClick={categoryShow}  />
        <input type="submit" value='graphiccards' onClick={categoryShow}   />
      </div>
      <Button onClick={toCreate}>Add A New Machine</Button>
      <div className={styles.things}>
        {content? (
          <div className={styles.products}>
            {content.map(product => 
                <div className={styles.product} onMouseEnter={() => setIsHoverWindow(true)}  onMouseLeave={() => setIsHoverWindow(false)}>
                  <img src={`http://127.0.0.1:8000/images/${product.imageUrl}.png`} alt="" />
                  <div className={styles.product__item}>
                    <a href="">{product.name}</a>
                  </div>
                  <div className={styles.product__notification} >
                    <h5>{product.name}</h5>
                    <h3> {product.brandId? (<>Brand: {product.brandId}</>) :( <></> ) }</h3>
                  </div>
                </div>
            )}
          </div>
        )
        : (<div>Not Fount, Bro...</div>)}
      </div>
    </Layout>
  )
}

export default Home