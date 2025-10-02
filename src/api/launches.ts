import ky from 'ky'
import { type Launch } from '../types/launch'

export const getLaunches = async (): Promise<Launch[]> => {
  return ky.get('https://api.spacexdata.com/v3/launches?launch_year=2020').json<Launch[]>()
}
