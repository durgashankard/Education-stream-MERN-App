import { Button } from "@mui/material";


export function UserLogin() {
    return (
        <div className="p-3">
            <form>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" /></dd>
                </dl>
                <Button variant="contained" color="primary" className="w-75 rounded rounded-2">Login</Button>

            </form>
        </div>
    )
}