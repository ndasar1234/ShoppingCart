import styled from "styled-components"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, getProducts } from "../redux/apiCalls";


const Container = styled.div`
    flex: 4;
`

const Product = styled.div`
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

const ProductList = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        deleteProduct(id, dispatch)
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'product', headerName: 'Product', width: 200, renderCell: (params) => {
                return (
                    <Product>
                        <Image src={params.row.image} alt="" />
                        {params.row.title}
                    </Product>
                )
            }
        },
        { field: 'inStock', headerName: 'In Stock', width: 200 },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
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
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Container>
    )
}

export default ProductList