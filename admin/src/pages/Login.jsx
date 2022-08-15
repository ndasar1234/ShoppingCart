import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import { login } from "../redux/apiCalls"


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

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }

    const user = useSelector(state => state.user)


    return (
        <Container>
            <Input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleClick}>Login</Button>
            {user.currentUser && <Navigate to="/" replace={true} />}
        </Container>
    )
}

export default Login