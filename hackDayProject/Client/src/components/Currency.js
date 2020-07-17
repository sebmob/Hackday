/* eslint-disable react/prop-types */
import React from 'react'

export default function Currency(props) {
    const {
        currency,
        selectCurrency,
        onChangeCurr,
        amount,
        onChangeInput
    } = props
    return (
        <div>
            <form className="form--input--currency">
                <input className="input--number" type="number" value={amount} onChange={onChangeInput}/>
                <select className="select--currency" value={selectCurrency} onChange={onChangeCurr}>
                    {currency.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}
