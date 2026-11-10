const demoEmail = import.meta.env.VITE_DEMO_EMAIL || 'student@example.com'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === demoEmail && password === 'demo123456') {
        resolve({ username })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}
