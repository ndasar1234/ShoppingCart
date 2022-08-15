import { useState } from "react"
import styled from "styled-components"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../firebase"
import { addProduct } from "../redux/apiCalls"
import { useDispatch } from "react-redux"


const Container = styled.div`
    flex: 4;
`

const Title = styled.h1`
    
`

const Form = styled.form`
    margin-top: 10px;
`

const Item = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    &>label {
        color: gray;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    &>input {
        padding: 10px;
        height: 30px;
    }

    &>select {
        height: 50px;
        padding: 10px;
    }
`

const Button = styled.button`
    margin-top: 1px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const NewProduct = () => {

    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCategories = (e) => {
        setCategories(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault()
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:

                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, image: downloadURL, categories }
                    addProduct(product, dispatch)
                });
            }
        );
    }

    return (
        <Container>
            <Title>New Product</Title>
            <Form>
                <Item>
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </Item>
                <Item>
                    <label>Title</label>
                    <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </Item>
                <Item>
                    <label>Description</label>
                    <input name="description" type="text" placeholder="description..." onChange={handleChange} />
                </Item>
                <Item>
                    <label>Price</label>
                    <input name="price" type="number" placeholder="0" onChange={handleChange} />
                </Item>
                <Item>
                    <label>Categories</label>
                    <input type="text" placeholder="jeans,skirts" onChange={handleCategories} />
                </Item>
                <Item>
                    <label>In Stock</label>
                    <select name="inStock" defaultValue="" onChange={handleChange}>
                        <option disabled value=""></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </Item>
                <Button onClick={handleClick}>Create</Button>
            </Form>
        </Container>
    )
}

export default NewProduct