import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Verify } from './pages/Verify'
import { Dashboard } from './pages/Dashboard'
import { Admin } from './pages/Admin'
import { Docs } from './pages/Docs'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
