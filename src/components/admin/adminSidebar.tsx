import { useState } from "react";

export function AdminSidebar() {

    const [activeMenu, setActiveMenu] =
        useState("Video Management");


    const menuItems = [
        {
            name: "Dashboard",
            icon: "bi-grid"
        },
        {
            name: "Video Management",
            icon: "bi-camera-video"
        },
        {
            name: "Analytics",
            icon: "bi-bar-chart"
        },
        {
            name: "Comments",
            icon: "bi-chat-left-text"
        },
        {
            name: "Settings",
            icon: "bi-gear"
        }
    ];


    return (

        <aside className="admin-sidebar">

            {/* Admin Information */}

            <div className="sidebar-admin-profile">

                <div className="sidebar-avatar">
                    A
                </div>

                <div>

                    <strong>
                        Admin Portal
                    </strong>

                    <small>
                        Video Management
                    </small>

                    <small>
                        System Admin
                    </small>

                </div>

            </div>


            {/* Menu */}

            <nav className="admin-menu">

                {menuItems.map((item) => (

                    <button
                        key={item.name}
                        className={
                            activeMenu === item.name
                                ? "admin-menu-item active"
                                : "admin-menu-item"
                        }
                        onClick={() =>
                            setActiveMenu(item.name)
                        }
                    >

                        <i
                            className={`bi ${item.icon}`}
                        ></i>

                        <span>
                            {item.name}
                        </span>

                    </button>

                ))}

            </nav>


            {/* Bottom Section */}

            <div className="sidebar-bottom">

                <button className="upload-sidebar-button">

                    <i className="bi bi-cloud-upload"></i>

                    Upload New Video

                </button>


                <button className="sidebar-bottom-item">

                    <i className="bi bi-question-circle"></i>

                    Help Center

                </button>


                <button className="sidebar-bottom-item logout">

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </aside>
    );
}