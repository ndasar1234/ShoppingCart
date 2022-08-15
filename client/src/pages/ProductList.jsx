import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
import { mobile } from "../responsive"

const Container = styled.div`
    
`

const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;

    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

    ${mobile({ marginRight: "0" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;

    ${mobile({ margin: "10px 10px 0 0" })}
`

const Option = styled.option`
    
`

const ProductList = () => {
    const location = useLocation()
    const category = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("")

    const handleFilters = (event) => {
        const value = event.target.value
        setFilters({
            ...filters,
            [event.target.name]: value
        })
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>{category || "All Products"}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select defaultValue={""} name="color" onChange={handleFilters}>
                        <Option disabled value="">Color</Option>
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="red">Red</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="yellow">Yellow</Option>
                        <Option value="green">Green</Option>
                    </Select>
                    <Select defaultValue={""} name="size" onChange={handleFilters}>
                        <Option disabled value="">Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select defaultValue={""} onChange={e => setSort(e.target.value)}>
                        <Option disabled value="">By</Option>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList