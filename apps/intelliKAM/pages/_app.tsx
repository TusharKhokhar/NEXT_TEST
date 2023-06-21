import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { FC, useState } from 'react'
import fetcher from 'fetcher'
import { SWRConfig } from 'swr'
import '../styles/global.css'
import { CNOptions, NotificationContext } from '../contexts/Notification'
import Notifier from '../components/Notifier'
import { AuthGurd } from '../components/AuthGurd'
import Layout from '../common/layout'
import { Provider } from 'react-redux'
import { reduxWrapper } from '../store/store'
import { useRouter } from 'next/router'

type AppProps = {
  Component: FC
  pageProps: {
    session: Session | null
  }
}

const swrConfigOpts = {
  fetcher,
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...rest
}: AppProps) {
  const { store, props } = reduxWrapper.useWrappedStore(rest)
  const notificationState = useState<CNOptions>(null)
  const { pathname } = useRouter()

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <SWRConfig value={swrConfigOpts}>
          <NotificationContext.Provider value={notificationState}>
            <AuthGurd>
              {pathname != '/verified' && pathname != '/login' ? (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </AuthGurd>
            <Notifier />
          </NotificationContext.Provider>
        </SWRConfig>
      </SessionProvider>
    </Provider>
  )
}
