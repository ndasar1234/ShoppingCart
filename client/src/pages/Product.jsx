import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { publicRequest } from "../api/requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;

    ${mobile({ padding: "10px", flexDirection: "column" })}
`

const ImageContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;

    ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;

    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Description = styled.p`
    margin: 20px 0;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    
    ${mobile({ width: "95%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;

`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`
    
`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({ width: "95%" })}
`

const AmountContainer = styled.div`

    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    min-width: 120px;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`


const Product = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        categories: [],
        size: [],
        color: [],
        price: 0,
    })
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`)
                setProduct(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "decrease" && quantity > 1) setQuantity(quantity - 1)
        else if (type === "increase") setQuantity(quantity + 1)
    }

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity, color, size }))
    }

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.image} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize defaultValue="" onChange={(e) => setSize(e.target.value)}>
                                <FilterSizeOption disabled value="" ></FilterSizeOption>
                                {product.size.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("decrease")} />
                            <Amount>{quantity}</Amount>
                            <AddIcon style={{ cursor: "pointer" }} onClick={() => handleQuantity("increase")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product