

import { Link, useNavigate } from "react-router-dom";
import { AdminHeader } from "./adminHeader";

import { AdminSidebar } from "./adminSidebar";
import { useCookies } from "react-cookie";
import type { VideoContract } from "../../contracts/videoContract";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";


export function AdminDashboard() {

    const navigate = useNavigate();
    const [videos, setVideos] = useState<VideoContract[]>()


    const [cookies] = useCookies([
        "adminAuth"
    ]);

    if (!cookies.adminAuth) {
        navigate("/");
    }

    const LoadVideos = useCallback(() => {

        axios.get(`http://localhost:6060/videos`)
            .then(response => {
                setVideos(response.data);
            })

    }, [videos]);



    useEffect(() => {
        LoadVideos();
    }, [])

    const videoRows = useMemo(() => {
        if (videos?.length === 0) {
            return (
                <tr>
                    <td colSpan={4}> No Videos - Library is Empty </td>
                </tr>
            )
        }
        else {
            return (
                videos?.map((video) =>
                    <tr key={video.video_id}>
                        <td>{video.title}</td>
                        <td>{video.description}</td>
                        <td>
                            <iframe src={video.url} width={200} height={100}></iframe>
                        </td>
                        <td>
                            <Link to="/" className="btn btn-warning bi bi-pen-fill">  </Link>
                            <Link to="/" className="btn btn-danger mx-2 bi bi-trash-fill">  </Link>
                        </td>
                    </tr>
                )
            )
        }
    }, [videos]);

    return (

        <div className="admin-page">

            {/* Header */}

            <AdminHeader />


            <div className="admin-layout">

                {/* Sidebar */}

                <AdminSidebar />


                {/* Main Content */}

                <div className="mt-4">
                    <div className="d-flex">

                        <div>
                            <div>
                                <input type="text" placeholder="Search videos" style={{ width: '400px' }} className="form-control" />
                            </div>
                        </div>

                    <div>
                        <Link to="/add-video" className="bi bi-plus btn btn-primary"> Add New Video </Link>
                    </div>
                    </div>
                    <div className="mt-4">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Preview</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    videoRows
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>


            {/* Footer */}

            <footer className="admin-footer">

                <strong>
                    EduStream
                </strong>

                <span>
                    © 2024 EduStream Learning Platform.
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