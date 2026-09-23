import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserHeader } from "./userHeader";
import { UserSidebar } from "./userSidebar";
import type { CategoryContract } from "../../contracts/categoryContract";
import type { VideoContract } from "../../contracts/videoContract";

export function UserDashboard() {
    const [cookies] = useCookies(["userAuth"]);
    const [categories, setCategories] = useState<CategoryContract[]>([]);
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const userName = cookies.userAuth?.user_name || cookies.userAuth?.user_id || "Alex";

    // Default dummy videos matching screenshot if DB is initially empty
    const dummyVideos = [
        {
            video_id: 101,
            title: "Advanced Design Systems for Scale: 2024 Masterclass",
            author: "Marcus Thorne",
            role: "Lead Product Designer",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
            views: "45k views",
            time: "2 days ago",
            duration: "12:45",
            likes: "1.2k",
            comments: 84,
            category_id: 1,
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            video_id: 102,
            title: "React 19 Deep Dive: New Features and Performance Hooks",
            author: "Elena Rodriguez",
            role: "Senior Dev Advocate",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
            views: "128k views",
            time: "1 week ago",
            duration: "28:10",
            likes: "5.8k",
            comments: 312,
            category_id: 2,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            video_id: 103,
            title: "Scaling Startups: The 2024 Unit Economics Playbook",
            author: "David Chen",
            role: "VC Partner & Lecturer",
            avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80",
            views: "22k views",
            time: "4 hours ago",
            duration: "18:55",
            likes: "940",
            comments: 42,
            category_id: 3,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ];

    useEffect(() => {
        // Fetch categories from backend API
        axios.get("http://localhost:6060/categories")
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log("Categories load error:", err);
            });

        // Fetch videos from backend API
        axios.get("http://localhost:6060/videos")
            .then(res => {
                setVideos(res.data);
            })
            .catch(err => {
                console.log("Videos load error:", err);
            });
    }, []);

    // Combine backend videos and dummy showcase videos together
    const allVideos = [...videos, ...dummyVideos];

    // Filter videos by category
    const displayVideos = selectedCategory === 0
        ? allVideos
        : allVideos.filter(v => v.category_id === selectedCategory);

    return (
        <div className="user-dashboard-wrapper">
            {/* Top Navigation Bar */}
            <UserHeader />

            {/* Main Layout: Sidebar + Main Content */}
            <div className="user-layout">
                {/* Left Sidebar */}
                <UserSidebar />

                {/* Right Main Screen */}
                <main className="user-main-content">
                    {/* Welcome Header & Category Filters */}
                    <div className="user-welcome-section">
                        <div className="user-welcome-text">
                            <h2>Welcome back, {userName}</h2>
                            <p>Pick up where you left off or explore new pathways.</p>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="user-category-pills">
                            <button
                                className={`category-pill ${selectedCategory === 0 ? "active" : ""}`}
                                onClick={() => setSelectedCategory(0)}
                            >
                                All Categories
                            </button>

                            {categories.length > 0 ? (
                                categories.map(cat => (
                                    <button
                                        key={cat.category_id}
                                        className={`category-pill ${selectedCategory === cat.category_id ? "active" : ""}`}
                                        onClick={() => setSelectedCategory(cat.category_id)}
                                    >
                                        {cat.category_name}
                                    </button>
                                ))
                            ) : (
                                <>
                                    <button
                                        className={`category-pill ${selectedCategory === 1 ? "active" : ""}`}
                                        onClick={() => setSelectedCategory(1)}
                                    >
                                        Design
                                    </button>
                                    <button
                                        className={`category-pill ${selectedCategory === 2 ? "active" : ""}`}
                                        onClick={() => setSelectedCategory(2)}
                                    >
                                        Development
                                    </button>
                                    <button
                                        className={`category-pill ${selectedCategory === 3 ? "active" : ""}`}
                                        onClick={() => setSelectedCategory(3)}
                                    >
                                        Business
                                    </button>
                                </>
                            )}

                            <button className="category-filter-btn" title="More Filters">
                                <i className="bi bi-sliders"></i>
                            </button>
                        </div>
                    </div>

                    {/* Trending Now Section */}
                    <section className="user-section">
                        <div className="section-header">
                            <div className="section-title">
                                <i className="bi bi-lightning-charge text-primary"></i>
                                <h3>Trending Now</h3>
                            </div>
                            <button className="view-all-link">View all</button>
                        </div>

                        {/* Video Cards Grid or Empty Library State */}
                        {displayVideos.length === 0 ? (
                            <div className="empty-video-state">
                                <div className="empty-state-icon">
                                    <i className="bi bi-camera-video-off"></i>
                                </div>
                                <h4 className="empty-state-title">Video Library is empty</h4>
                                <p className="empty-state-desc">
                                    No videos are currently available in this category. Browse other topics or reset filters to explore our full learning library.
                                </p>
                                <button
                                    className="empty-state-btn"
                                    onClick={() => setSelectedCategory(0)}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="user-video-grid">
                                {displayVideos.map((video: any) => (
                                    <div key={video.video_id} className="user-video-card">
                                        {/* Video Preview / Thumbnail */}
                                        <div className="video-card-thumbnail">
                                            {video.url && video.url.includes("youtube") ? (
                                                <iframe
                                                    src={video.url}
                                                    title={video.title}
                                                    className="video-iframe"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <img
                                                    src={video.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"}
                                                    alt={video.title}
                                                    className="video-thumb-img"
                                                />
                                            )}
                                            <span className="video-duration-badge">
                                                {video.duration || "15:20"}
                                            </span>
                                        </div>

                                        {/* Video Content & Details */}
                                        <div className="video-card-body">
                                            <div className="video-instructor-row">
                                                <img
                                                    src={video.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
                                                    alt="Instructor"
                                                    className="instructor-avatar"
                                                />
                                                <div className="video-title-box">
                                                    <h4 className="video-card-title">{video.title}</h4>
                                                    <p className="instructor-meta">
                                                        {video.author || "Marcus Thorne"} • {video.role || "Lead Instructor"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Views and Timestamp */}
                                            <div className="video-card-stats">
                                                <span>
                                                    <i className="bi bi-eye me-1"></i>
                                                    {typeof video.views === "number" ? `${video.views.toLocaleString()} views` : (video.views || "45k views")}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    <i className="bi bi-clock me-1"></i>
                                                    {video.time || "2 days ago"}
                                                </span>
                                            </div>

                                            {/* Likes & Comments Action Bar */}
                                            <div className="video-card-footer">
                                                <div className="video-feedback-actions">
                                                    <button className="feedback-btn" title="Like">
                                                        <i className="bi bi-hand-thumbs-up"></i>
                                                        <span>{video.likes || "1.2k"}</span>
                                                    </button>
                                                    <button className="feedback-btn" title="Dislike">
                                                        <i className="bi bi-hand-thumbs-down"></i>
                                                    </button>
                                                </div>

                                                <button className="feedback-btn comments" title="Comments">
                                                    <i className="bi bi-chat-left-text"></i>
                                                    <span>{video.comments || 84}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Recommended for You Section */}
                    <section className="user-section mt-4">
                        <div className="section-header">
                            <div className="section-title">
                                <i className="bi bi-play-circle text-primary"></i>
                                <h3>Recommended for You</h3>
                            </div>
                        </div>

                        <div className="recommended-grid">
                            {/* Big Blue Banner Card */}
                            <div className="featured-banner-card">
                                <span className="banner-badge">NEW SERIES</span>
                                <h3 className="banner-title">
                                    Mastering Generative AI in Creative Workflows
                                </h3>
                                <p className="banner-description">
                                    A 12-part series on integrating LLMs and diffusion models into your design process.
                                </p>
                                <div className="banner-footer">
                                    <button className="start-learning-btn">
                                        <i className="bi bi-play-fill me-1"></i> Start Learning
                                    </button>
                                    <span className="banner-enrollment">
                                        10,420 students enrolled
                                    </span>
                                </div>
                            </div>

                            {/* Stacked Recommendation Pathway Cards */}
                            <div className="pathway-cards-column">
                                {/* Card 1 */}
                                <div className="pathway-card">
                                    <div className="pathway-icon-box dark-blue">
                                        <i className="bi bi-code-slash"></i>
                                    </div>
                                    <div className="pathway-info">
                                        <span className="pathway-tag">PATHWAYS</span>
                                        <h4 className="pathway-title">Python for Data Science 2024</h4>
                                        <div className="pathway-meta">
                                            <span><i className="bi bi-clock me-1"></i> 14h 20m</span>
                                            <span className="rating"><i className="bi bi-star-fill text-warning me-1"></i> 4.9</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="pathway-card">
                                    <div className="pathway-icon-box light-gray">
                                        <i className="bi bi-kanban"></i>
                                    </div>
                                    <div className="pathway-info">
                                        <span className="pathway-tag green">MARKETING</span>
                                        <h4 className="pathway-title">Brand Identity & Narrative Design</h4>
                                        <div className="pathway-meta">
                                            <span><i className="bi bi-clock me-1"></i> 6h 45m</span>
                                            <span className="rating"><i className="bi bi-star-fill text-warning me-1"></i> 4.7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}