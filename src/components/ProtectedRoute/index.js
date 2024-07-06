import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'
import verifyToken from '../../services/apiRequests/verifyToken';

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token');

  if (token === undefined || token === null || token === "") {
    return <Redirect to="/login" />
  }
  const isTokenValid = verifyToken();
  if(!isTokenValid){
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
