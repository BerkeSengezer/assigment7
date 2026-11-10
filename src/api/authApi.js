const demoEmail = import.meta.env.VITE_DEMO_EMAIL || '230408005@st.biruni.edu.tr'

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
