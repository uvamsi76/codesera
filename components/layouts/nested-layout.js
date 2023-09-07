import {Appbar} from '../Appbar'
import Footer from '../footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}