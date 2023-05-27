import spinner from './Loader.module.css'
import { RotatingLines } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className={spinner.container}>
      <RotatingLines
        height="80"
        width="80"
        strokeColor="#6E78E8"
        ariaLabel="loading"
      ></RotatingLines>
    </div>
  )
}