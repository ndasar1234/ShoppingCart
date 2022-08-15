import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`

const Products = ({ category, filters, sort }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(category ? `http://localhost:5000/api/v1/products?category=${category}` : "http://localhost:5000/api/v1/products")
        setProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    if (filters) setFilteredProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    )
    else {
      setFilteredProducts([...products])
    }
  }, [products, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev => [...prev].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }))
    }
    else if (sort === "asc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    }
    else if (sort === "desc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {category
        ? filteredProducts.map(item => <Product item={item} key={item._id} />)
        : products.slice(0, 8).map(item => <Product item={item} key={item._id} />)
      }
    </Container>
  )
}

export default Products