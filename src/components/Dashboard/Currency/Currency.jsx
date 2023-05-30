import { useState, useEffect } from 'react'
// import {getListCurrency} list of currencies from api privatbank
import { Status } from '../../utility/constants'
import Loader from '../../_General/Loader'
import s from './Currency.module.css'

const Currency = () => {
    const [dataCurrency, setDataCurrency] = useState([])
  const [error, setError] = useState(null)
    const [status, setStatus] = useState(Status.IDLE)
    
    useEffect(() => {
    setStatus(Status.PENDING)
    getListCurrency()
      .then((results) => {
        setDataCurrency(results)
        setStatus(Status.RESOLVED)
      })
      .catch((error) => {
        setError('Something went wrong. Please check back later.')
        setStatus(Status.REJECTED)
      })
  }, [])


 return (
<div className={s.card}>
      <ul className={s.header}>
        <li>Currency</li>
        <li>Purchase</li>
        <li>Sell</li>
      </ul>
      <div
        className={`${s.body} ${
          status.includes(Status.REJECTED) ? s.flex : ''
        }`}
      >
        {status.includes(Status.PENDING) && <Loader />}
        {status.includes(Status.RESOLVED) &&
          dataCurrency &&
          dataCurrency.map((el, i) => (
            <ul key={i} className={s.bodyList}>
              <li>{el.ccy}</li>
              <li>{parseFloat(el.buy).toFixed(2)}</li>
              <li>{parseFloat(el.sale).toFixed(2)}</li>
            </ul>
          ))}
        {status.includes(Status.REJECTED) && (
          <div className={s.error}>{error}</div>
        )}
      </div>
    </div>
  )
}
export default Currency