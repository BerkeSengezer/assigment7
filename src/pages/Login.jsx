import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { login } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { dispatch } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(username.trim(), password)
      dispatch({ type: 'LOGGED_IN', user })
      navigate(location.state?.from ?? '/', { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Student email{' '}
            <input type="email" autoComplete="username" required
              value={username} onChange={event => setUsername(event.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Password{' '}
            <input type="password" autoComplete="current-password" required
              value={password} onChange={event => setPassword(event.target.value)} />
          </label>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
    </>
  )
}
