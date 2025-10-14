import { Header } from './modules/Header'
import { VacanciesHeader } from './modules/VacanciesHeader'
import { VacanciesGrid } from './modules/VacanciesGrid'

function App() {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#e9ecef' }}>
        <VacanciesHeader />
        <VacanciesGrid/>
      </div>
    </>
  )
}

export default App
