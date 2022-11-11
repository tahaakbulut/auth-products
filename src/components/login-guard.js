import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import Login from '../pages/login';

const LoginGuard = () => {
  const { token } = useAuth();

  return <>{token ? <Outlet /> : <Login />}</>;
};
export default LoginGuard;
