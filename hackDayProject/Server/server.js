const express = require('express');
const fetch = require('node-fetch')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log(e))
})

app.get('/api/change/:currency', (req, res) => {
    const firstCurrency = req.params.currency.substring(0,3)
    const secondCurrency = req.params.currency.substring(3,6)
    fetch(`https://api.exchangeratesapi.io/latest?base=${firstCurrency}&symbols=${secondCurrency}`)
        .then(res => res.json())
        .then(data => res.send(data))
        .catch(e => console.log(e))

})

const port = '5000';

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})