import axios from 'axios';
import { useFormik } from 'formik';
import { type AdminContract } from '../../contracts/adminContract';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';

export function AdminLogin() {


    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([
        "adminAuth"
    ]);

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get('http://127.0.0.1:6060/admin')
                .then(response => {
                    const item: AdminContract = response.data.find((user: AdminContract) =>
                        user.admin_id === admin.admin_id);
                    if (item) {
                        if (item.password === admin.password) {
                            setCookie('adminAuth', item.admin_id);
                            navigate('/admin-dashboard');
                        } else {
                            alert('Invalid Password');
                        }
                    } else {
                        alert('Invalid Admin Id');
                    }
                })
        }
    })

    return (
        <div className='container-fluid my-4'>

            <form className="p-3" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name='admin_id' className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name='password' className="form-control" /></dd>
                </dl>
                <Button variant='contained' color='warning' type='submit' className="w-75 rounded rounded-2"> Login</Button>
            </form>
        </div>
    )
}