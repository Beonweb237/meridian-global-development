import { Routes, Route } from 'react-router'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Countries from './pages/Countries'
import Results from './pages/Results'
import Partners from './pages/Partners'
import Resources from './pages/Resources'
import News from './pages/News'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-do" element={<Programs />} />
          <Route path="/where-we-work" element={<Countries />} />
          <Route path="/results" element={<Results />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}
