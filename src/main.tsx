import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header.tsx'
import Home from './Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Header />
    <App />
    <Home />
  </BrowserRouter>,
)
