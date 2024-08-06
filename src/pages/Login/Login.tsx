import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
    let navigate = useNavigate()
    return (
      


  <div className=" bg-light-background3 m-4  dark:bg-dark-background3 flex flex-col p-4 " >
                <h1 className="text-4xl font-serif">Login</h1>
                <div>
                <button type='submit'
                    onClick={() => { navigate('/home') }}
                    className='hover:underline mx-4'>
                    Login useNavigate
                </button>
                <Link to='/home' className='hover:underline  mx-4'>Login por Link</Link>
                </div>

        </div>
    )
}

export default Login