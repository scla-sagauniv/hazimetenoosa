import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Memo } from './pages/Memo'
import { Auth } from './pages/Auth'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/memo" element={<Memo />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
