import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Memo } from './pages/Memo'
import { Auth } from './pages/Auth'
import { SignUp } from './pages/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/memo" element={<Memo />} />
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
