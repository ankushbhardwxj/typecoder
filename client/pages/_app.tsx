import type { AppProps } from 'next/app'
import {Head} from 'next/document';
import Layout from '../components/layout'
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
