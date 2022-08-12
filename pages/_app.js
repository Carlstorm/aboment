import { ApolloProvider } from '@apollo/client'
import CMSclient from '../cms/db/config/apolloClient'


// styles
import '../style/global.scss'
import style from '../style/base.module.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={CMSclient}>
      <div className={style.app}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}