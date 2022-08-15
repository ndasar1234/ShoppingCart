import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { userRequest } from "../api/requestMethods"
import Chart from "../components/Chart"
import FeaturedInfo from "../components/FeaturedInfo"
import WidgetLg from "../components/WidgetLg"
import WidgetSm from "../components/WidgetSm"


const Container = styled.div`
    flex: 4;
`

const Widgets = styled.div`
    display: flex;
    margin: 20px;
`

const Home = () => {

    const [userStats, setUserStats] = useState([])

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    )

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats")
                res.data.map(item =>
                    setUserStats(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active Users": item.total },
                    ])
                )
            } catch (error) {
                console.log(error)
            }
        }
        getStats()
    }, [MONTHS])

    return (
        <Container>
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active Users" />
            <Widgets>
                <WidgetSm />
                <WidgetLg />
            </Widgets>
        </Container>
    )
}

export default Home