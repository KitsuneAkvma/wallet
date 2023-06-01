import Media from 'react-media'
import { Redirect } from 'react-router-dom'
import CommonContainer from '../../components/_General/CommonContainer'
import { mediaQueries } from '../../utility/constants'
import Header from '../../components/_General/Header'
import Navigation from '../../components/_General/Navigation'
import Currency from '../../components/Dashboard/Currency'
import s from './CurrencyPage.module.css'

function CurrencyPage() {
  return (
    <>
      <Header />
      <CommonContainer>
        <div className={s.container}>
          <Media queries={mediaQueries}>
            {(matches) => (
              <>
                {matches.response && (
                  <div className={s.box}>
                    <Navigation />
                    <Currency />
                  </div>
                )}
                {matches.mobile && (
                  <div className={s.box}>
                    <Navigation />
                    <Currency />
                  </div>
                )}
                {matches.tablet && <Redirect to="/" />}
                {matches.desktop && <Redirect to="/" />}
              </>
            )}
          </Media>
        </div>
      </CommonContainer>
    </>
  )
}

export default CurrencyPage