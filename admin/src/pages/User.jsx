import styled from "styled-components"
import { PermIdentity, AdminPanelSettings, MailOutline } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { updateCustomer } from "../redux/apiCalls"


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
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 16px;


`

const BodyContainer = styled.div`
    display: flex;
    margin-top: 20px;
`

const Show = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const ShowTop = styled.div`
    display: flex;
    align-items: center;
`

// const ShowImage = styled.img`
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     object-fit: cover;
// `

const ShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const ShowUsername = styled.span`
    font-weight: 600;
`

// const ShowUserTitle = styled.span`
//     font-weight: 300;
// `

const ShowBottom = styled.div`
    margin-top: 20px;
`

const ShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);

`

const ShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #444;
`

const ShowInfoTitle = styled.span`
    margin-left: 10px;
`

const Update = styled.div`
    flex: 2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    margin-left: 20px;
`

const UpdateTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const UpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const UpdateLeft = styled.div`
    
`

const UpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    &>label {
        margin-bottom: 5px;
        font-size: 14px;
    }
`

const UpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`

const UpdateSelect = styled.select`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid gray;
`

const UpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

// const UpdateUpload = styled.div`
//     display: flex;
//     align-items: center;
// `

// const UpdateImage = styled.img`
//     width: 100px;
//     height: 100px;
//     border-radius: 10px;
//     object-fit: cover;
//     margin-right: 20px;
// `

const UpdateButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 10px 12px;
    cursor: pointer;
    background-color: darkblue;
    color: white;
    font-weight: 600;
`

const User = () => {

    const location = useLocation()
    const customerId = location.pathname.split("/")[2]
    const customer = useSelector(state => state.customer.customers.find(customer => customer._id === customerId))
    const [updatedCustomer, setUpdatedCustomer] = useState(customer)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUpdatedCustomer(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        updateCustomer(customerId, updatedCustomer, dispatch)
    }

    return (
        <Container>
            <TitleContainer>
                <Title>Edit User</Title>
                <Link to="/newUser">
                    <AddButton>Create</AddButton>
                </Link>
            </TitleContainer>
            <BodyContainer>
                <Show>
                    <ShowTop>
                        <ShowTopTitle>
                            <ShowUsername>{customer.username}</ShowUsername>
                        </ShowTopTitle>
                    </ShowTop>
                    <ShowBottom>
                        <ShowTitle>Account Details</ShowTitle>
                        <ShowInfo>
                            <PermIdentity style={{ fontSize: "16px" }} />
                            <ShowInfoTitle>ID: {customer._id}</ShowInfoTitle>
                        </ShowInfo>
                        <ShowTitle>Is Admin?</ShowTitle>
                        <ShowInfo>
                            <AdminPanelSettings style={{ fontSize: "16px" }} />
                            <ShowInfoTitle>{customer.isAdmin ? "Yes" : "No"}</ShowInfoTitle>
                        </ShowInfo>
                        <ShowTitle>Contact Details</ShowTitle>
                        <ShowInfo>
                            <MailOutline style={{ fontSize: "16px" }} />
                            <ShowInfoTitle>{customer.email}</ShowInfoTitle>
                        </ShowInfo>
                    </ShowBottom>
                </Show>
                <Update>
                    <UpdateTitle>Edit</UpdateTitle>
                    <UpdateForm>
                        <UpdateLeft>
                            <UpdateItem>
                                <label>Username</label>
                                <UpdateInput name="username" type="text" placeholder={customer.username} onChange={handleChange} />
                            </UpdateItem>
                            <UpdateItem>
                                <label>Email</label>
                                <UpdateInput name="email" type="email" placeholder={customer.email} onChange={handleChange} />
                            </UpdateItem>
                            <UpdateItem>
                                <label>Admin</label>
                                <UpdateSelect name="isAdmin" id="isAdmin" defaultValue="" onChange={handleChange}>
                                    <option disabled value=""></option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </UpdateSelect>
                            </UpdateItem>
                        </UpdateLeft>
                        <UpdateRight>
                            <UpdateButton onClick={handleClick}>Update</UpdateButton>
                        </UpdateRight>
                    </UpdateForm>
                </Update>
            </BodyContainer>
        </Container>
    )
}

export default User