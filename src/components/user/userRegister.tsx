

export function UserRegister() {
    return (
        <div className="container-fluid">
            <form>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" className="form-control" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" className="form-control" /></dd>
                </dl>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}