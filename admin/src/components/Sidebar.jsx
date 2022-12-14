import styled from "styled-components"
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom"


const Container = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`

const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`

const Menu = styled.div`
    margin-bottom: 10px;
`

const Title = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`

const List = styled.ul`
    list-style: none;
    padding: 5px;
`

const ListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;

    &:active, &:hover {
    background-color: rgb(228, 228, 249);
    }
`


const Sidebar = () => {
    return (
        <Container>
            <Wrapper>
                <Menu>
                    <Title>Dashboard</Title>
                    <List>
                        <Link to="/" className="link">
                            <ListItem><LineStyle
                                style={{ marginRight: "5px", fontSize: "20px" }}
                            /> Home</ListItem>
                        </Link>
                        <ListItem><Timeline
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Analytics</ListItem>
                        <ListItem><TrendingUp
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Sales</ListItem>
                    </List>
                </Menu>
                <Menu>
                    <Title>Quick Menu</Title>
                    <List>
                        <Link to="/users" className="link">
                            <ListItem><PermIdentity
                                style={{ marginRight: "5px", fontSize: "20px" }}
                            /> Users</ListItem>
                        </Link>
                        <Link to="/products" className="link">
                            <ListItem><Storefront
                                style={{ marginRight: "5px", fontSize: "20px" }}
                            /> Products</ListItem>
                        </Link>
                        <ListItem><AttachMoney
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Transactions</ListItem>
                        <ListItem><BarChart
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Reports</ListItem>
                    </List>
                </Menu>
                <Menu>
                    <Title>Notifications</Title>
                    <List>
                        <ListItem><MailOutline
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Mail</ListItem>
                        <ListItem><DynamicFeed
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Feedback</ListItem>
                        <ListItem><ChatBubbleOutline
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Messages</ListItem>
                    </List>
                </Menu>
                <Menu>
                    <Title>Staff</Title>
                    <List>
                        <ListItem><WorkOutline
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Manage</ListItem>
                        <ListItem><Timeline
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Analytics</ListItem>
                        <ListItem><Report
                            style={{ marginRight: "5px", fontSize: "20px" }}
                        /> Reports</ListItem>
                    </List>
                </Menu>
            </Wrapper>
        </Container>
    )
}

export default Sidebar