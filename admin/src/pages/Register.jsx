import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import { addCustomer } from "../redux/apiCalls"


const Container = styled.div`
    flex: 4;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
`

const Button = styled.button`
    padding: 10px;
    width: 100px;
`

const Register = () => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: 'true'
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
        addCustomer(userInfo, dispatch)
    }

    const user = useSelector(state => state.user)

    return (
        <Container>
            <Input name="username" type="text" placeholder="Username" onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <Button onClick={handleClick}>Login</Button>
            {user.currentUser && <Navigate to="/" replace={true} />}
        </Container>
    )
}

export default Register