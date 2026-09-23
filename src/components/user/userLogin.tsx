import { Button } from "@mui/material";
import { useFormik } from "formik";
import type { UserContract } from "../../contracts/userContract";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


export function UserLogin() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["userAuth"]);

    const formik = useFormik<UserContract>({
        initialValues: {
            user_id: "",
            user_name: '',
            password: '',
            email: ""
        },
        onSubmit: (users) => {
            axios.get("http://localhost:6060/users").then((response) => {
                const user = response.data.find((user: UserContract) => user.user_id === users.user_id && user.password === users.password);
                if (user) {
                    setCookie("userAuth", user);
                    alert("Login Successful");
                    navigate("/user-dashboard");
                } else {
                    alert("Invalid Credentials");
                }
            })

        }
    });

    return (
        <div className="p-3">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="user_id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <Button type="submit" variant="contained" color="primary" className="w-75 rounded rounded-2">Login</Button>

            </form>
        </div>
    )
}