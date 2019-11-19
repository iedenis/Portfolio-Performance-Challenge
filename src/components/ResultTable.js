import React from 'react'
import { StyledContainer } from './styledComponents';
import { Table } from 'react-bootstrap';

export const ResultTable = ({ stocksValues }) => {
    const sum = stocksValues.reduce((acc, curr) => {
        return acc + (curr.newAmount - curr.oldAmount)
    }, 0)
    return (

        <StyledContainer >
            <h2>Your Revenue</h2>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Stock Name</th>
                        <th>Invested</th>
                        <th>Returned</th>
                        <th>Profit</th>
                    </tr>
                </thead>

                <tbody>

                    {stocksValues.map((stock, idx) => {
                        return (<tr key={`${stock}-${idx}`}>
                            <td>{idx + 1}</td>
                            <td>{stock.stockName}</td>
                            <td>${stock.oldAmount}</td>
                            <td>${stock.newAmount}</td>
                            <td>${stock.newAmount - stock.oldAmount}</td>
                        </tr>
                        )

                    })}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>Your total profit is ${sum}</strong></td>
                    </tr>

                </tbody>
            </Table>
        </StyledContainer>
    )
}
