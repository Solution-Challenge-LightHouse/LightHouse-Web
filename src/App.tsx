import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login.tsx'
import User from './User.tsx'
import BoardList from './BoardList.tsx'
import Rank from './Rank.tsx'
import Question from './Question.tsx'
import Join from './Join.tsx'
import BoardWrite from './BoardWrite.tsx'
import BoardDetail from './BoardDetail.tsx'
import Home from './Home.tsx'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/User' element={<User />} />
        <Route path='/BoardList' element={<BoardList />} />
        <Route path='/Rank' element={<Rank />} />
        <Route path='/Question' element={<Question />} />
        <Route path='/Join' element={<Join />} />
        <Route path='/BoardDetail' element={<BoardDetail />} />
        <Route path='/BoardWrite' element={<BoardWrite />} />
        {/* <Route path='/' element={< />} /> */}
      </Routes>
  )
}

export default App
