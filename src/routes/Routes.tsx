import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { AdminDashboard } from '../components/admin/adminDashboard';
import { UserRegister } from '../components/user/userRegister';
import { UserLogin } from '../components/user/userLogin';
import { UserDashboard } from '../components/user/userDashboard';
import { AdminLogin } from '../components/admin/adminLogin';
import { AddVideo } from '../components/admin/addVideo';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'user-register',
        element: <UserRegister />
    },
    {
        path: 'user-login',
        element: <UserLogin />
    },
    {
        path: 'user-dashboard',
        element: <UserDashboard />
    },
    {
        path: 'admin-dashboard',
        element: <AdminDashboard />
    },
    {
        path: 'admin-login',
        element: <AdminLogin />
    },
    {
        path: "add-video",
        element: <AddVideo />
    },
    {
        
    }

]);

export default router;