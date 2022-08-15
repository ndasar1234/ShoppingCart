import styled from "styled-components"
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/apiCalls";
import { Link } from "react-router-dom";


const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 999;
`

const Wrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    
`

const Logo = styled.span`
    font-weight: bold;
    font-size: 30px;
    color: darkblue;
    cursor: pointer;
`

const Right = styled.div`
    display: flex;
    align-items: center;
`

const IconContainer = styled.div`
    cursor: pointer;
    margin-right: 10px;
    color: #555;
`

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`

const Button = styled.button`
    border: none;
    padding:  7px 10px;
    border-radius: 5px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-left: 20px;
`


const Topbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        logout(dispatch)
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>nikhiladmin</Logo>
                </Left>
                <Right>
                    <IconContainer>

                        {!user.currentUser &&
                            <>
                                <Link to="/register"><Button>Register</Button></Link>
                                <Link to="/login"><Button>Login</Button></Link>
                            </>}
                        {user.currentUser && <Button onClick={handleClick}>Logout</Button>}
                    </IconContainer>
                    <IconContainer>
                        <Badge badgeContent="2" color="primary">
                            <NotificationsNone />
                        </Badge>
                    </IconContainer>
                    <IconContainer>
                        <Badge badgeContent="2" color="primary">
                            <Language />
                        </Badge>
                    </IconContainer>
                    <IconContainer>
                        <Settings />
                    </IconContainer>
                    <Avatar src="https://github.com/ndasar1234.png" alt="PFP" />
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Topbar