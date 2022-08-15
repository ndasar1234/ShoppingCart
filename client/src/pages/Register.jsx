import { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { register } from "../redux/apiCalls"
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;

    ${mobile({ width: "75%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
`

const Register = () => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        register(dispatch, userInfo)
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    {/* <Input placeholder="first name" />
                    <Input placeholder="last name" /> */}
                    <Input name="username" type="text" placeholder="username" onChange={handleChange} />
                    <Input name="email" type="email" placeholder="email" onChange={handleChange} />
                    <Input name="password" type="password" placeholder="password" onChange={handleChange} />
                    {/* <Input placeholder="confirm password" /> */}
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register