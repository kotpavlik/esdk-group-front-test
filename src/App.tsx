
import Footer from './components/Footer'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import { NavBar } from './components/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// начинается приложение тут
// а комментарии на русском языке вообще уместны? Ну компания работат на РБ и РФ.
// жаль я сразу не зашел на сайт и не сделал в вашем стиле. Можно было бы стянуть цвета и шрифты. 🥲
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="pt-16 sm:pt-18 lg:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App