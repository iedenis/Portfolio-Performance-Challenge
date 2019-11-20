import React from 'react'
import { Bar } from 'react-chartjs-2'
import { StyledContainer } from './styledComponents'
const Chart = ({ stocksValues }) => {

    let profit = stocksValues.map(item => { return item.newAmount - item.oldAmount })
    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
    ]

    const data = {
        labels: stocksValues.map(name => name.stockName),
        datasets: [
            {
                label: 'Change in value',
                data: profit,
                backgroundColor: stocksValues.map(stock => colors[Math.floor(Math.random() * colors.length)])
            }
        ]
    }

    return (
        <StyledContainer>
            <Bar
                data={data}

                options={{
                    title: {
                        display: true,
                        text: 'Stocks change',
                        fontSize: 25

                    },
                    legend: {
                        display: true,
                        position: "right"
                    }
                }}
            ></Bar>
        </StyledContainer>
    )
}

export default Chart
