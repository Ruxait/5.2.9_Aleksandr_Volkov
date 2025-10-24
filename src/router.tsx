import { Route } from 'react-router-dom'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyInfoPage } from './pages/VacancyInfoPage'
import Layout from './pages/Layout'
import {ErrorPage} from './pages/ErrorPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<VacanciesPage />} />
      <Route path="vacancies" element={<VacanciesPage />}>
        <Route path="moscow" element={<VacanciesPage />} />
        <Route path="petersburg" element={<VacanciesPage />} />
      </Route>
      <Route path="vacancy/:id" element={<VacancyInfoPage />} />
    </Route>,
  ),
  {
    basename: '/5.2.5_Aleksandr_Volkov', 
  }
)

export default router
