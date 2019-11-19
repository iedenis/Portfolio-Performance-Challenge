import React from 'react';
import './App.css';
import { UserInput } from './components/UserInput';
import { Container, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { ResultTable } from './components/ResultTable';
import { TryThis } from './components/TryThis';
import Chart from './components/Chart'
function App() {

  const [error, setError] = useState({ value: false, message: '' })
  const [stockChange, setStockChange] = useState({})
  const [stocksValues, setStocksValues] = useState([])

  const setDay = () => {
    return new Date().getDay() === 1 ? new Date().getHours() > 10 ? new Date().getDate() : new Date().getDate() - 3
      : (new Date().getDate() - 1)
  }

  const yesterday = new Date(new Date().setDate(setDay())).toISOString().slice(0, 10);

  useEffect(() => {
    console.log(stocksValues)
  }, [stockChange, stocksValues])

  const handleUserInput = async (data, callback) => {
    //setUserData({data})
    let fetchedData = [];
    const stocks = data.stocks;
    const amount = data.amount;
    stocks.map((stock, idx) => {
      let oldAmount = amount * (stock.stockPercentage / 100);
      fetchedData.push(fetchDataPromise(stock.value, data.date, stock.stockPercentage, oldAmount))
    })
    await Promise.all(fetchedData).then(res => setStocksValues(res)).catch(err => {
      setError({ value: true, message: err })
    })
  }

  const fetchDataPromise = async (stockName, date, percentage, oldAmount) => {
    const promise = new Promise(async (resolve, reject) => {
      const url = `https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${stockName}&date=${date}&api_token=379GkiBmMK8tAoywHB3TNIzARfIovvVczcczsZDAtJe1IzjCdwnFHdGWQZbP`;
      let dayValue, yesterdayValue;
      try {
        dayValue = await fetch(url)
          .then(data => data.json())
          .catch(err => setError({
            value: true,
            message: err
          }))

        yesterdayValue = await fetch(`https://api.worldtradingdata.com/api/v1/history_multi_single_day?symbol=${stockName}&date=${yesterday}&api_token=379GkiBmMK8tAoywHB3TNIzARfIovvVczcczsZDAtJe1IzjCdwnFHdGWQZbP`).then(data => data.json())
      } catch (err) {

        setError({ value: true, message: err })
        reject('ERROR', err)
      }
      console.log(yesterdayValue.Message)
      if (dayValue.Message || yesterdayValue.Message) {
        setError({
          value: true,
          message: dayValue.Message ? dayValue.Message : yesterday.Message
        });
        reject('Cannot fetch data')
      }
      else {
        const stockPrice = dayValue.data[stockName]['close'];
        const todayPrice = yesterdayValue.data[stockName]['open'];
        const ratio = Math.round((todayPrice / stockPrice) * 100) / 100
        const newAmount = parseInt(oldAmount * ratio);
        const res = { stockName: stockName, oldAmount: oldAmount, newAmount: newAmount }
        resolve(res)
      }
    })
    return promise
  }

  const Results = () => {
    return <React.Fragment>
      <ResultTable stocksValues={stocksValues}></ResultTable>
      <Chart stocksValues={stocksValues}></Chart>
    </React.Fragment>
  }

  return (
    <React.Fragment>
      <Container style={{ maxHeight: '100vh' }}>
        {stocksValues.length > 0 ? <Results /> :
          <React.Fragment>
            <UserInput handleUserInput={handleUserInput} stocksValues={stocksValues} value={error.value} message={error.message} ></UserInput>
            <TryThis></TryThis>
          </React.Fragment>

        }
      </Container>
    </React.Fragment>

  );

}


export default App;
