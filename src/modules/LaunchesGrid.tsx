import { useEffect, useReducer } from 'react'
import { SimpleGrid, Container } from '@mantine/core'
import { getLaunches } from '../api/launches'
import { LaunchCard } from '../components/LaunchCard'
import { Modal } from '../components/Modal'
import { type Launch } from '../types/launch'

type State = {
  launches: Launch[]
  selectedLaunch: Launch | null;
}

type Action = { type: 'SET_LAUNCHES'; payload: Launch[] } | { type: "OPEN_MODAL"; payload: Launch }
  | { type: "CLOSE_MODAL" };

const initialState: State = {
  launches: [],
  selectedLaunch: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload }
    case "OPEN_MODAL":
      return { ...state, selectedLaunch: action.payload };
    case "CLOSE_MODAL":
      return { ...state, selectedLaunch: null };
    default:
      return state
  }
}

export function LaunchesGrid() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { launches, selectedLaunch } = state;

  useEffect(() => {
    getLaunches().then(data => dispatch({ type: 'SET_LAUNCHES', payload: data as Launch[] }))
  }, [])

  return (
    <Container>
      <SimpleGrid cols={3} spacing="lg">
        {launches.map(launch => (
          <LaunchCard key={launch.mission_name} launch={launch} onOpen={() => dispatch({ type: 'OPEN_MODAL', payload: launch })} />
        ))}
      </SimpleGrid>
      {selectedLaunch && (
        <Modal onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
          <h2>{selectedLaunch.mission_name}</h2>
          <img
            src={selectedLaunch.links?.mission_patch}
            alt={selectedLaunch.mission_name}
            style={{
              display: 'block',
              margin: '20px auto',
              maxHeight: '200px',
            }}
          />
          <p>
            <strong>Mission name:</strong> {selectedLaunch.mission_name}
          </p>
          <p>
            <strong>Rocket name:</strong> {selectedLaunch.rocket?.rocket_name}
          </p>
          <p>
            <strong>Details:</strong> {selectedLaunch.details || 'No details'}
          </p>
        </Modal>
      )}
    </Container>
  )
}
