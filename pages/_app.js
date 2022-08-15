import { ApolloProvider } from '@apollo/client'
import CMSclient from '../cms/db/config/apolloClient'

import Navigation from '../components/navigation/navigation'
import Footer from '../components/footer/Footer'
import Link from 'next/link'

// styles
import '../style/global.scss'
import style from '../style/base.module.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={CMSclient}>
      <div className={style.app}>
        {!pageProps.cms ? <Navigation>
          <Link href="/">om os</Link>
        </Navigation> : null}
        <Component {...pageProps} />
        {!pageProps.cms ? <Footer /> : null}
      </div>
    </ApolloProvider>
  )
}