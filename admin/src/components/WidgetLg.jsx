import { useEffect, useState } from "react"
import styled from "styled-components"
import { userRequest } from "../api/requestMethods"
import { format } from "timeago.js"


const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`

const TableRow = styled.tr`
  
`

const TableHeader = styled.th`
  text-align: left;
`

const TableCell = styled.td`
  display: ${props => props.type === "user" && "flex"};
  align-items: ${props => props.type === "user" && "center"};
  font-weight: ${props => props.type === "user" && "600"};
  
  font-weight: ${props => (props.type === "date" || props.type === "amount") && "300"};
`

// const Image = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-right: 10px;
// `

const UserId = styled.span`
  
`

const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;

  background-color: ${props => props.type === "approved" && "#e5faf2"};
  background-color: ${props => props.type === "declined" && "#fff0f1"};
  background-color: ${props => props.type === "pending" && "#ebf1fe"};

  color: ${props => props.type === "approved" && "#3bb077"};
  color: ${props => props.type === "declined" && "#d95087"};
  color: ${props => props.type === "pending" && "#2a7ade"};
`

const LgButton = ({ type }) => {
  return <Button type={type}>{type}</Button>
}

const WidgetLg = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders")
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [])

  return (
    <Container>
      <Title>Latest Transactions</Title>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>

          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell type="user">
                <UserId>{order.userId}</UserId>
              </TableCell>
              <TableCell type="date">{format(order.createdAt)}</TableCell>
              <TableCell type="amount">${order.amount}</TableCell>
              <TableCell type="status">
                <LgButton type={order.status} />
              </TableCell>
            </TableRow>
          ))}

        </tbody>
      </Table>
    </Container>
  )
}

export default WidgetLg