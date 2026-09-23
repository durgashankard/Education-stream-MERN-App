import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserHeader() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Browse");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="user-header">
            {/* Left: Brand / Logo */}
            <div className="user-header-left">
                <div className="user-brand" onClick={() => navigate("/user-dashboard")}>
                    <div className="user-brand-icon">
                        <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div className="user-brand-text">
                        <span className="user-brand-title">EduStream</span>
                        <span className="user-brand-subtitle">LEARNING PORTAL</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="user-search-container">
                    <i className="bi bi-search user-search-icon"></i>
                    <input
                        type="text"
                        className="user-search-input"
                        placeholder="Search courses, instructors, or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Right: Nav Links, Bell, Go Pro, Avatar */}
            <div className="user-header-right">
                <nav className="user-nav-links">
                    <button
                        className={`user-nav-link ${activeTab === "Browse" ? "active" : ""}`}
                        onClick={() => setActiveTab("Browse")}
                    >
                        Browse
                    </button>
                    <button
                        className={`user-nav-link ${activeTab === "Pathways" ? "active" : ""}`}
                        onClick={() => setActiveTab("Pathways")}
                    >
                        Pathways
                    </button>
                    <button
                        className={`user-nav-link ${activeTab === "Instructors" ? "active" : ""}`}
                        onClick={() => setActiveTab("Instructors")}
                    >
                        Instructors
                    </button>
                </nav>

                <button className="user-icon-btn" title="Notifications">
                    <i className="bi bi-bell"></i>
                </button>

                <button className="user-go-pro-btn">
                    Go Pro
                </button>

                <div className="user-avatar-wrap" title="User Profile">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                        alt="User Avatar"
                        className="user-avatar-img"
                        onError={(e) => {
                            // Fallback to stylized letter if image fails to load
                            const target = e.currentTarget;
                            target.style.display = "none";
                            if (target.parentElement) {
                                target.parentElement.innerText = "U";
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    );
}