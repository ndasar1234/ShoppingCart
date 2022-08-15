import styled from "styled-components"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "../redux/apiCalls";


const Container = styled.div`
    flex: 4;
`

const User = styled.div`
    display: flex;
    align-items: center;
`

const Image = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`

const UserList = () => {

    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)

    useEffect(() => {
        getCustomers(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteCustomer(id, dispatch)
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'isAdmin',
            headerName: 'Is Admin?',
            width: 120,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/${params.row._id}`}>
                            <EditButton>Edit</EditButton>
                        </Link>
                        <DeleteOutline style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(params.row._id)} />
                    </>
                )
            }
        }
    ];



    return (
        <Container>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Container>
    )
}

export default UserList