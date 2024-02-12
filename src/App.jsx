import {conf} from './conf/config'
import './App.css'

function App() {
  

  return (
    <>
      <h1 className='bg-red-500 p-5'>Hello Welcome to the Puri's Blog Project</h1>
      {
        console.log(conf)
      }
    </>
  )
}

export default App
