

import { Link, useNavigate } from "react-router-dom";
import { AdminHeader } from "./adminHeader";

import { AdminSidebar } from "./adminSidebar";
import { useCookies } from "react-cookie";
import type { VideoContract } from "../../contracts/videoContract";
import type { CategoryContract } from "../../contracts/categoryContract";
import { useEffect, useState } from "react";
import axios from "axios";


export function AdminDashboard() {

    const navigate = useNavigate();
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const [categories, setCategories] = useState<CategoryContract[]>([]);

    const [cookies] = useCookies([
        "adminAuth"
    ]);

    useEffect(() => {
        if (!cookies.adminAuth) {
            navigate("/");
        }
    }, [cookies.adminAuth, navigate]);

    useEffect(() => {
        axios.get('http://localhost:6060/videos')
            .then(response => {
                setVideos(response.data);
            });
        axios.get('http://localhost:6060/categories')
            .then(response => {
                setCategories(response.data);
            });
    }, []);

    function getCategoryName(categoryId: number): string {
        const cat = categories.find(c => c.category_id === categoryId);
        return cat ? cat.category_name : 'Unknown';
    }

    function handleDelete(videoId: number) {
        if (confirm('Are you sure you want to delete this video?')) {
            axios.delete(`http://localhost:6060/delete-video/${videoId}`)
                .then(() => {
                    setVideos(prev => prev.filter(v => v.video_id !== videoId));
                });
        }
    }

    return (

        <div className="admin-page">

            {/* Header */}

            <AdminHeader />


            <div className="admin-layout">

                {/* Sidebar */}

                <AdminSidebar />


                {/* Main Content */}

                <main className="admin-main">

                    <div className="dashboard-heading">
                        <div>
                            <h1>Video Management</h1>
                            <p>Manage and organize your video content library.</p>
                        </div>
                        <div className="active-editors">
                            <div className="editor-avatars">
                                <span>A</span>
                                <span>D</span>
                                <span>S</span>
                            </div>
                            <small>3 active editors</small>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="statistics-grid">

                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i className="bi bi-camera-video"></i>
                            </div>
                            <span>TOTAL VIDEOS</span>
                            <strong>{videos.length}</strong>
                            <small className="positive">+12%</small>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon purple">
                                <i className="bi bi-eye"></i>
                            </div>
                            <span>TOTAL VIEWS</span>
                            <strong>{videos.reduce((sum, v) => sum + (v.views || 0), 0).toLocaleString()}</strong>
                            <small className="positive">+8.2%</small>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="bi bi-hand-thumbs-up"></i>
                            </div>
                            <span>TOTAL LIKES</span>
                            <strong>{videos.reduce((sum, v) => sum + (v.likes || 0), 0).toLocaleString()}</strong>
                            <small className="positive">+5.4%</small>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon cyan">
                                <i className="bi bi-collection"></i>
                            </div>
                            <span>CATEGORIES</span>
                            <strong>{categories.length}</strong>
                            <small className="positive">+2</small>
                        </div>

                    </div>


                    {/* Video Management Card */}

                    <div className="video-management-card">

                        <div className="video-toolbar">

                            <div className="video-search">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search by video title or ID..."
                                />
                            </div>

                            <select className="category-select">
                                <option>All Categories</option>
                                {categories.map(c => (
                                    <option key={c.category_id} value={c.category_id}>
                                        {c.category_name}
                                    </option>
                                ))}
                            </select>

                            <button className="filter-button">
                                <i className="bi bi-funnel"></i> More Filters
                            </button>

                            <button
                                className="add-video-button"
                                onClick={() => navigate('/add-video')}
                            >
                                <i className="bi bi-plus"></i> Add New Video
                            </button>

                        </div>


                        <table className="admin-video-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '30px' }}>
                                        <input type="checkbox" />
                                    </th>
                                    <th>VIDEO TITLE</th>
                                    <th>PREVIEW</th>
                                    <th>CATEGORY</th>
                                    <th>VIEWS ↕</th>
                                    <th>LIKES ↕</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    videos.length === 0
                                        ? (
                                            <tr>
                                                <td colSpan={7} className="empty-table">
                                                    No videos found — Library is empty.
                                                </td>
                                            </tr>
                                        )
                                        : videos.map(video => (
                                            <tr key={video.video_id}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>
                                                    <div className="video-title-cell">
                                                        <div className="video-thumbnail">
                                                            <i className="bi bi-play-fill"></i>
                                                        </div>
                                                        <div>
                                                            <strong>{video.title}</strong>
                                                            <small>VOD-{video.video_id}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <iframe
                                                        src={video.url}
                                                        width={120}
                                                        height={68}
                                                        style={{ border: 'none', borderRadius: '4px' }}
                                                    ></iframe>
                                                </td>
                                                <td>
                                                    <span className="category-badge">
                                                        {getCategoryName(video.category_id)}
                                                    </span>
                                                </td>
                                                <td>{video.views?.toLocaleString()}</td>
                                                <td>{video.likes?.toLocaleString()}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="edit-button"
                                                            title="Edit"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="delete-button"
                                                            title="Delete"
                                                            onClick={() => handleDelete(video.video_id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>

                        <div className="table-footer">
                            Showing <strong>1-{videos.length}</strong> of <strong>{videos.length}</strong> videos
                        </div>

                    </div>

                </main>

            </div>


            {/* Footer */}

            <footer className="admin-footer">

                <strong>
                    EduStream
                </strong>

                <span>
                    © 2026 EduStream Learning Platform.
                    All rights reserved.
                </span>

                <div>

                    <a href="#">
                        Privacy Policy
                    </a>

                    <a href="#">
                        Terms of Service
                    </a>

                    <a href="#">
                        Help Center
                    </a>

                    <a href="#">
                        Admin Portal
                    </a>

                </div>

            </footer>

        </div>
    );
}