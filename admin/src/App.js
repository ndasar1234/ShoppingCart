import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import styled from "styled-components"
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import Register from "./pages/Register"



const Container = styled.div`
  display: flex;
  margin-top: 10px;
`


function App() {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin || false

  return (
    <Router>
      <Topbar />
      <Container>
        <Sidebar />
        <Routes>
          {admin && <>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
          </>}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
