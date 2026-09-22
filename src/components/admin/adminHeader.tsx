import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminHeader() {

    const navigate = useNavigate();

    const [, , removeCookie] = useCookies([
        "adminAuth"
    ]);

    const handleLogout = () => {

        removeCookie("adminAuth", {
            path: "/"
        });

        navigate("/");
    };


    return (

        <header className="admin-header">

            {/* Logo */}

            <div
                className="admin-logo"
                onClick={() => navigate("/admin-dashboard")}
            >
                EduStream
            </div>


            {/* Search */}

            <div className="admin-header-search">

                <i className="bi bi-search"></i>

                <input
                    type="text"
                    placeholder="Search resources..."
                />

            </div>


            {/* Right Side */}

            <div className="admin-header-right">

                <button
                    className="header-link"
                    onClick={() => navigate("/user-login")}
                >
                    Sign In
                </button>


                <button
                    className="header-register"
                    onClick={() => navigate("/user-register")}
                >
                    Register
                </button>


                <div className="admin-profile">

                    <div className="admin-avatar">
                        A
                    </div>

                    <div className="admin-profile-info">

                        <strong>
                            Admin Portal
                        </strong>

                        <small>
                            Administrator
                        </small>

                    </div>

                    <button
                        className="admin-logout-button"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>

                </div>

            </div>

        </header>
    );
}