import { FaSpinner } from 'react-icons/fa'

const Loader = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
      <FaSpinner size={20} className=' animate-spin'/>
    </div>
  )
}

export default Loader;