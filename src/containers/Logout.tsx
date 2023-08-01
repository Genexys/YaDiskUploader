  import { useAuthContext } from '../context/authContext'
  import Button from '../components/Button'

  const Logout = () => {
    const { logout } = useAuthContext()

    return (
      <Button onClick={logout} theme="logout">Logout</Button>
    )
  }
  
  export default Logout