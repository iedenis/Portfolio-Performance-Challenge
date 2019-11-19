import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { StyledContainer } from './styledComponents'
const StyledH2 = styled.h2`
text-align:center;
padding-bottom: 10px;
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
color: ${props => props.icon.iconName === 'plus-circle' ? 'green' : 'red'};
:hover{color: 'red'};
`


export const UserInput = ({ handleUserInput, value, message, stocksValues }) => {
    const [showAlert, setShowAlert] = useState({ value: value, message: message });
    const [stocks, setStocks] = useState([{ value: null, stockPercentage: 0 }])

    const [input, setInput] = useState({
        date: '',
        amount: 0
    })

    useEffect(() => {
        console.log(showAlert.value)
        setTimeout(() => {
            //console.log(showAlert.value)
            setShowAlert({ value: false, message: '' });
        }, 5000);

    }, [showAlert.value])


    useEffect(() => {
        setShowAlert({ value: value, message: message })
    }, [value, message])

    const onChangeHandler = (index, event) => {
        const myStocks = [...stocks]
        /*console.log(myStocks[index][event.target.name])*/
        myStocks[index][event.target.name] = event.target.value;
        setStocks(myStocks);
    }

    const addField = (e) => {
        e.preventDefault();
        const values = [...stocks];
        if (!values.find(o => o.value === null)) {
            values.push({ value: null })
            setStocks(values)
        }
        else {
            setShowAlert({ value: true, message: 'Insert a stock name' });
        }

    }


    const printResult = (dataToPrint) => {
        console.log(dataToPrint)
    }
    const submit = (e) => {
        e.preventDefault();
        const sum = stocks.reduce((acc, stock) => {
            return acc + parseInt(stock.stockPercentage)
        }, 0)
        if (stocks[0].value !== null) {
            if (input.date === '') {
                setShowAlert({ value: true, message: 'Please select a date' });

            }
            else {
                const data = {
                    stocks: stocks,
                    date: input.date,
                    amount: input.amount
                }
                if (sum < 100) {
                    setShowAlert({ value: true, message: "The sum has to be 100%" })
                }
                else if (!value) handleUserInput(data, printResult)

            }
        }

        else {
            setShowAlert({ value: true, message: 'Insert data' })
        }

    }
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        <React.Fragment>
            <StyledContainer>
                <Form onSubmit={submit}>
                    <StyledH2>Portfolio Performance Challenge</StyledH2>
                    <label htmlFor='date'>Select the starting date</label>
                    <Form.Control name='date' type="date" placeholder="date" onChange={handleInput} />
                    <br />
                    <label>Initial balance in $</label>
                    <Form.Control name='amount' type="number" placeholder="Amount" onChange={handleInput} />
                    <br />
                    <Row>
                        <Col><label>Insert your stocks</label></Col>

                        <Col>Part in %</Col>
                    </Row>

                    <Row>
                        {stocks.map((stock, idx) => {
                            return (
                                <div
                                    style={{ display: 'flex' }}
                                    key={`${stock}-${idx}`} >
                                    <Col xs={6} >
                                        <Form.Control
                                            style={{ marginTop: '.5em', marginBottom: '.5em' }}
                                            key={`${stock}-${idx}`}
                                            name='value'
                                            type="text"
                                            placeholder="STOCK"
                                            value={stock.value || ""}
                                            onChange={e => onChangeHandler(idx, e)}
                                        />
                                    </Col>
                                    <Col key={`${stock}+${idx}`}>
                                        <Form.Control style={{ marginTop: '.5em', marginBottom: '.5em' }} key={`${stock}-${idx}`}
                                            name='stockPercentage'
                                            type="number"
                                            placeholder="PERCENT"
                                            /*value={stock.value || ""}*/
                                            onChange={e => onChangeHandler(idx, e)}
                                        />
                                    </Col>
                                </div>
                            );
                        })}

                    </Row>
                    <button
                        onClick={addField} style={{ width: '50%' }}>
                        <FontAwesomeIconStyled
                            icon={faPlusCircle}></FontAwesomeIconStyled></button>
                    <button onSubmit={(e) => submit(e)}
                        style={{ width: '50%' }}>
                        Submit</button>
                </Form>
                {showAlert.value ? <Alert style={{ marginTop: '.5em' }} variant="danger">{showAlert.message}</Alert> : ''}
            </StyledContainer>
        </React.Fragment >

    )
}
