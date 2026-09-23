import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserSidebar() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["userAuth"]);
    const [activeMenu, setActiveMenu] = useState("Home");

    const menuItems = [
        { name: "Home", icon: "bi-house-door-fill" },
        { name: "My Library", icon: "bi-collection" },
        { name: "Trending", icon: "bi-graph-up-arrow" },
        { name: "Certifications", icon: "bi-patch-check" },
        { name: "Downloads", icon: "bi-arrow-down-circle" },
    ];

    function handleLogout() {
        removeCookie("userAuth");
        navigate("/");
    }

    return (
        <aside className="user-sidebar">
            {/* Top Menu Links */}
            <nav className="user-sidebar-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        className={`user-sidebar-item ${activeMenu === item.name ? "active" : ""}`}
                        onClick={() => setActiveMenu(item.name)}
                    >
                        <i className={`bi ${item.icon}`}></i>
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Bottom Links */}
            <div className="user-sidebar-bottom">
                <button className="user-sidebar-bottom-item">
                    <i className="bi bi-question-circle"></i>
                    <span>Help Center</span>
                </button>

                <button className="user-sidebar-bottom-item logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}