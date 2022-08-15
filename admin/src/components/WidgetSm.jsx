import styled from "styled-components"
import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { userRequest } from "../api/requestMethods";


const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

const User = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  font-weight: 600;

`

// const UserTitle = styled.span`
//   font-weight: 300;
// `

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`

const WidgetSm = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users?new=true")
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  return (
    <Container>
      <Title>New Users</Title>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <Image src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} />
            <User>
              <UserName>{user.username}</UserName>
            </User>
            <Button>
              <Visibility style={{ fontSize: "16px", marginRight: "5px" }} />
              Display
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default WidgetSm