import { VacanciesHeader } from '../modules/VacanciesHeader'
import { VacanciesGrid } from '../modules/VacanciesGrid'

export const VacanciesPage = () => {
  return (
    <div style={{ backgroundColor: '#e9ecef' }}>
      <VacanciesHeader />
      <VacanciesGrid />
    </div>
  )
}
