import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default Home