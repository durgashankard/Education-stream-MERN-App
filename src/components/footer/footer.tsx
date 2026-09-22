import { Button } from "@mui/material";
import { Link } from "react-router-dom";


export function Footer() {

    return (
        <footer className="container-fluid my-4">
            <hr />
            <div className="fs-4 mx-2 fw-bold">
                EduStream
            </div>
            <div className="mx-4 d-flex justify-content-between">
                <span> &copy; 2026 EduStream Learning Platform. All rights reserved.</span>
                <div className="fs-5">
                    <Link to="" className="">Privacy Policy</Link>
                    <Link to="" className="mx-3">Terms of Service</Link>
                    <Link to="" className="">Help Center</Link>
                    <Link to="/admin-login" className="mx-3">
                        <Button variant="contained">
                            Admin Portal
                        </Button>
                    </Link>

                </div>
            </div>
            <br />
            <br />
            <hr />
        </footer>
    )
}