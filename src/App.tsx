import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import SellerSignup from './pages/SellerSignup'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precos" element={<Pricing />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/vendedor" element={<SellerSignup />} />
        <Route path="/seja-parceiro" element={<SellerSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
