import { useAuthContext } from '../context/authContext'
import Button from '../components/Button';
import YaIcon from '../../assets/images/ya_icon.svg';
import YaText from '../../assets/images/text_yandex.svg';

const Login = () => {
  const { login } = useAuthContext();

  return (
    <Button onClick={login} theme="yandex">
      <img src={YaIcon} alt="Яндекс" title="Яндекс" />
      <img src={YaText} alt="Яндекс ID" title="Яндекс ID" />
    </Button>
  )
}

export default Login