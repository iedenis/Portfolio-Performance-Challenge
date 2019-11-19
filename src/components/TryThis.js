import React from 'react'
import { Table } from 'react-bootstrap'
import { StyledContainer } from './styledComponents';
import '../App.css'

export const TryThis = () => {
    return (
        <StyledContainer style={{ padding: '3px' }}>
            <h3 style={{ textAlign: 'center' }}>Try these stocks</h3>

            <Table size="sm">
                <thead>
                    <tr>
                        <th>Stock Name</th>
                        <th>Stock Name</th>
                        <th>Stock Name</th>
                        <th>Stock Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SNAP</td>
                        <td>AAPL</td>
                        <td>AMD</td>
                        <td>NVDA</td>
                    </tr>
                    <tr>
                        <td>MSFT</td>
                        <td>UNH</td>
                        <td>AMZN</td>
                        <td>GOOG</td>
                    </tr>
                </tbody>
            </Table>
        </StyledContainer>

    )
}
