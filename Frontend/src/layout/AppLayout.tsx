import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <main className=' w-full'>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default AppLayout;