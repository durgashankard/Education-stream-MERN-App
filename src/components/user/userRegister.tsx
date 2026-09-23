import axios from "axios"
import type { UserContract } from "../../contracts/userContract";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


export function UserRegister() {

    const navigate = useNavigate();

    const formik = useFormik<UserContract>({
        initialValues: {
            user_id: "",
            user_name: '',
            password: '',
            email: ""
        },
        onSubmit: (user) => {
            axios.post('http://localhost:6060/add-user', user)
                .then(() => {
                    alert('User Added')
                    navigate("/user-login");
                })
                .catch(() => {
                    alert('Error')
                })
        }
    });

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="user_id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="user_name" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="email" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}