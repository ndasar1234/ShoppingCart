import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import Chart from "../components/Chart"
import { Publish } from "@mui/icons-material"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useMemo, useState } from "react"
import { userRequest } from "../api/requestMethods"
import { updateProduct } from "../redux/apiCalls"


const Container = styled.div`
    flex: 4;
    padding: 20px;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.h1`
    
`

const AddButton = styled.button`
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`

const Top = styled.div`
    display: flex;
`

const TopLeft = styled.div`
    flex: 1;
`

const TopRight = styled.div`
    flex: 1;
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

`

const InfoTop = styled.div`
    display: flex;
    align-items: center;
`

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
`

const Name = styled.span`
    font-weight: 600;
`

const InfoBottom = styled.div`
    margin-top: 10px;
`

const InfoItem = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`

const InfoKey = styled.span`
    
`

const InfoValue = styled.span`
    font-weight: 300;
`

const Bottom = styled.div`
    padding: 20px;
    margin: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const Form = styled.form`
    display: flex;
    justify-content: space-between;
`

const FormLeft = styled.div`
    display: flex;
    flex-direction: column;

    &>label {
        margin-bottom: 10px;
        color: gray;
    }

    &>input {
        margin-bottom: 10px;
        border: none;
        padding: 5px;
        border-bottom: 1px solid gray;
    }

    &>select {
        margin-bottom: 10px;
    }
`

const FormRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const Upload = styled.div`
    display: flex;
    align-items: center;
`

const UploadImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`

const Button = styled.button`
    border: none;
    padding: 5px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Product = () => {

    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const [productStats, setProductStats] = useState([])
    const dispatch = useDispatch()
    const product = useSelector(state => state.product.products.find(product => product?._id === productId))
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    )

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(`orders/income?productId=${productId}`)
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setProductStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                )
            } catch (err) {
                console.log(err)
            }
        }
        getStats()
    }, [productId, MONTHS, updatedProduct])


    const handleChange = (e) => {
        setUpdatedProduct(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


    const handleClick = (e) => {
        e.preventDefault()
        updateProduct(productId, updatedProduct, dispatch)
    }


    return (
        <Container>
            <TitleContainer>
                <Title>Product</Title>
                <Link to="/newproduct">
                    <AddButton>Create</AddButton>
                </Link>
            </TitleContainer>
            <Top>
                <TopLeft>
                    <Chart data={productStats} dataKey="Sales" title="Sales Performance" />
                </TopLeft>
                <TopRight>
                    <InfoTop>
                        <Image src={product?.image} alt="" />
                        <Name>{product?.title}</Name>
                    </InfoTop>
                    <InfoBottom>
                        <InfoItem>
                            <InfoKey>Id:</InfoKey>
                            <InfoValue>{product?._id}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>Price:</InfoKey>
                            <InfoValue>${product?.price}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>Sales:</InfoKey>
                            <InfoValue>$5123</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>In Stock:</InfoKey>
                            <InfoValue>{product?.inStock}</InfoValue>
                        </InfoItem>
                    </InfoBottom>
                </TopRight>
            </Top>
            <Bottom>
                <Form>
                    <FormLeft>
                        <label>Product Name</label>
                        <input name="title" type="text" placeholder={product?.title} onChange={handleChange} />
                        <label>Product Description</label>
                        <input name="description" type="text" placeholder={product?.description} onChange={handleChange} />
                        <label>Price</label>
                        <input name="price" type="text" placeholder={product?.price} onChange={handleChange} />
                        <label>In Stock</label>
                        <select name="inStock" id="inStock" defaultValue="" onChange={handleChange}>
                            <option disabled value=""></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </FormLeft>
                    <FormRight>
                        <Upload>
                            <UploadImage src={product?.image} alt="" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </Upload>
                        <Button onClick={handleClick}>Update</Button>
                    </FormRight>
                </Form>
            </Bottom>
        </Container>
    )
}

export default Product