import '../styles/globals.css'
import Nav from './components/Header/Header'
import './components/Header/Header.css'
import './App.css'



function MyApp({ Component, pageProps }) {
  return (<><Nav/><Component {...pageProps} /></>)
}

export default MyApp
