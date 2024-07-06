import React, { Suspense } from "react";
import {  Route, Switch, Redirect } from "react-router-dom";
import LoadingView from "./components/LoadingView";
import Cookies from "js-cookie";
import verifyToken from "./services/apiRequests/verifyToken";
import {useAuth} from './context/AuthContext';


const LoginForm = React.lazy(() => import("./components/LoginForm"));

const RegisterForm = React.lazy(() => import("./components/RegisterForm"));
const Home = React.lazy(() => import("./components/Home"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const PaperDetailedView = React.lazy(() =>
  import("./components/PaperDetailedView")
);
const ViewStatus = React.lazy(() => import("./components/ViewStatus"));
const NotificationView = React.lazy(() =>
  import("./components/NotificationView")
);
const UploadAbstract = React.lazy(() => import("./components/UploadAbstract"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const MyProfile = React.lazy(() => import("./components/MyProfile"));
const HeaderNew = React.lazy(() => import("./components/HeaderNew"));



 
const App = () =>{
  const {isAuthenticated} = useAuth();
  return (
    
      <Suspense fallback={<LoadingView />}>
        {isAuthenticated && <HeaderNew />}
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          {/* <Route exact path="/auth-otp" component={AuthOtp} /> */}
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/:paperId" component={PaperDetailedView}/>
          <ProtectedRoute exact path="/view-status" component={ViewStatus} />
          <ProtectedRoute exact path="/notification" component={NotificationView}/>
          <ProtectedRoute exact path="/upload-paper" component={UploadAbstract} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route path="*" component={NotFound} />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
     
  );
}

export default App;
