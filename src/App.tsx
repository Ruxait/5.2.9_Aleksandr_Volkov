import { Routes, Route } from 'react-router-dom'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyInfoPage } from './pages/VacancyInfoPage'
import { Header } from './modules/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VacanciesPage />} />
        <Route path="/vacancy/:id" element={<VacancyInfoPage />} />
      </Routes>
    </>
  )
}

export default App
