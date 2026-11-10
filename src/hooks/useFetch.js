import { useEffect, useReducer } from 'react'

const noInputs = []
const initialState = { loading: true, error: null, data: null }

function fetchReducer(state, action) {
  switch (action.type) {
    case 'start':
      return initialState
    case 'success':
      return { loading: false, error: null, data: action.data }
    case 'failure':
      return { loading: false, error: action.error, data: null }
    default:
      return state
  }
}

export function useFetch(fetcher, inputs = noInputs) {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      dispatch({ type: 'start' })
      try {
        const data = await fetcher(...inputs, controller.signal)
        if (!controller.signal.aborted) {
          dispatch({ type: 'success', data })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({ type: 'failure', error })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [fetcher, inputs])

  return state
}
