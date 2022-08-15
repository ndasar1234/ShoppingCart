import styled from "styled-components"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../api/requestMethods";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Item = styled.div`
    flex: 1;
    margin: 0 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
`

const MoneyContainer = styled.div`
    margin: 10px 0;
    display: flex;
    align-items: center;
`

const Money = styled.span`
    font-size: 30px;
    font-weight: 600;
    font-weight: 600;
`

const MoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-weight: 600;
`

const Subtitle = styled.span`
    font-size: 15px;
    color: gray;
    font-weight: 600;
`

const FeaturedInfo = () => {

    const [income, setIncome] = useState([])
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income")
                setIncome(res.data)
                setPercentage(~~((res.data[res.data.length - 1].total * 100) / res.data[res.data.length - 2 || 0].total - 100))
            } catch (error) {
                console.log(error)
            }
        }
        getIncome()
    }, [])


    return (
        <Container>
            <Item>
                <Title>Revenue</Title>
                <MoneyContainer>
                    <Money>{income[income.length - 1]?.total}</Money>
                    <MoneyRate>%{percentage}{" "}
                        {percentage < 0
                            ? <ArrowDownward style={{ fontSize: "14px", marginLeft: "5px", color: "red" }} />
                            : <ArrowUpward style={{ fontSize: "14px", marginLeft: "5px", color: "green" }} />
                        }
                    </MoneyRate>
                </MoneyContainer>
                <Subtitle>Compared to last month</Subtitle>
            </Item>
            <Item>
                <Title>Sales</Title>
                <MoneyContainer>
                    <Money>$4,415</Money>
                    <MoneyRate>-1.4
                        <ArrowDownward style={{ fontSize: "14px", marginLeft: "5px", color: "red" }} />
                    </MoneyRate>
                </MoneyContainer>
                <Subtitle>Compared to last month</Subtitle>
            </Item>
            <Item>
                <Title>Cost</Title>
                <MoneyContainer>
                    <Money>$2,225</Money>
                    <MoneyRate>+1.4
                        <ArrowUpward style={{ fontSize: "14px", marginLeft: "5px", color: "green" }} />
                    </MoneyRate>
                </MoneyContainer>
                <Subtitle>Compared to last month</Subtitle>
            </Item>
        </Container>
    )
}

export default FeaturedInfo