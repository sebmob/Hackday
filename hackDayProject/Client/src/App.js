import React, {useEffect, useState} from 'react';
import Currency from './components/Currency'
import './App.css';

function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ dataBackend, setDataBackend ] = useState();
  const [ startCurrency, setStartCurrency ] = useState();
  const [ toCurrency, setToCurrency ] = useState(); 
  const [ amount, setAmount] = useState(0);
  const [ amountFromCurrency, setAmountFromCurrency ] = useState(true);
  const [ rate, setRate ] = useState();

  let toAmount;
  let fromAmount;
  if(amountFromCurrency) {
    fromAmount = amount
    toAmount = parseFloat(amount * rate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = parseFloat(amount / rate).toFixed(2)
  }

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setDataBackend([data.base, ...Object.keys(data.rates)])
        setStartCurrency(data.base)
        setToCurrency(Object.keys(data.rates)[0])
        setRate(data.rates[Object.keys(data.rates)[0]])
        setIsLoading(false)
      })
  
      .catch(e => console.log(e));
  }, [])

  useEffect(() => {
    if (startCurrency != null && toCurrency != null)
    fetch(`/api/change/${startCurrency}${toCurrency}`)
      .then(res => res.json())
      .then(data => setRate(data.rates[toCurrency]))
      .catch(e => console.log(e))
  }, [startCurrency, toCurrency])

  const handleChangeInput = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  const handleChangeToInput = (e) => {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      { isLoading ? (
        <p className="p--loading">Loading...</p>
      ) : (
        <div className="form--container">
          <Currency 
            currency={dataBackend}
            selectCurrency={startCurrency}
            onChangeCurr={e => setStartCurrency(e.target.value)}
            amount={fromAmount}
            onChangeInput={handleChangeInput}
           />
           <div className="equalSign">=</div>
          <Currency 
            currency={dataBackend}
            selectCurrency={toCurrency}
            onChangeCurr={e => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeInput={handleChangeToInput}
          />
        </div>
      )}
    </div>
  );
}

export default App;
