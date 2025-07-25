import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import AddMovie from './Components/AddMovie'
import EditMovie from './Components/EditMovie'
import SingleMovie from './Components/SingleMovie'

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/single-movie/:id" element={<SingleMovie />} />
      </Routes>
    </>
  )
}

export default App