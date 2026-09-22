import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export function Header() {

    return (
        <header className="container-fluid p-1 justify-content-center align-items-center  sticky-top bg-danger-subtle d-flex justify-content-between">

            <div className="d-flex ">
                <h2 className="text-primary fw-bold mx-3">
                    <Link to="/" className="text-decoration-none"> EduStream</Link>
                </h2>

                <ul className="list-unstyled fst-italic mx-4 d-flex fs-4 justify-content-center align-items-center" style={{ color: "#3d3d3f" }}>
                    <li className="" role="button">Courses</li>
                    <li className="mx-4" role="button">Categories</li>
                    <li className="" role="button">Instructors</li>
                    <li className="mx-4" role="button">Enterprice</li>
                </ul>

            </div>

            <div className="mx-4">
                <Link to="/user-login" className="text-decoration-none">
                    <Button variant="contained" color="inherit" className="mx-4">
                        Log In
                    </Button>
                </Link>
                <Link to="/user-register" className="text-decoration-none text-dark">
                    <Button variant="contained">
                        Register
                    </Button>
                </Link>

            </div>

        </header>
    )
}