import { useState } from "react";
import { AdminLogin } from "../admin/adminLogin"
import { UserLogin } from "../user/userLogin";
import { UserRegister } from "../user/userRegister";
import { Card } from "../home-card/homeCard";

export function Home() {

    const [userComponent, setUserComponent] = useState<any>(<UserLogin />);

    function handleNewUserClick(component: string) {
        if (component === 'login') {
            setUserComponent(<UserLogin />);
        } else {
            setUserComponent(<UserRegister />)
        }
    }



    return (
        <div className="container-fluid p-5">
            <div className="row px-3">
                <div className="col-7">
                    <span className="text-uppercase px-3 py-1 rounded rounded-5 text-bg-primary border border-2 shadow shadow-lg" role="button">New Releases 2026</span>

                    <div className="mt-5">
                        <h1 className="fw-bold" style={{ fontSize: "65px", fontFamily: "-apple-system" }}>Master the Future of <br />
                            <span className="text-primary">Digital Craftsmanship</span>
                        </h1>

                        <p className="mt-4 fs-5 fw-bold fst-italic text-secondary"> High-definition video tutorials delivered by industry-leading <br />
                            professionals. Join over 500,000 learners accelerating their <br />
                            careers today.</p>
                    </div>

                    <div>
                        <video autoPlay src="banner.mp4" controls width='100%' height="400" />
                    </div>

                </div>

                <div className="col-5 g-3 bg-body-secondary rounded rounded-4 border border-2 shadow shadow-lg" style={{ marginTop: "100px", height: "500px" }}>
                    <div className="col-6 p-4 ">
                        <div className="">
                            <ul className="nav nav-tabs">

                                <li className="nav-item"> <a href="#user" data-bs-toggle="tab" className="nav-link active">User </a> </li>

                                <li className="nav-item"> <a href="#admin" data-bs-toggle="tab" className="nav-link">Admin Portal</a> </li>
                            </ul>
                            <hr />

                            <div className="tab-content mt-4">
                                <div className="tab-pane  active" id="user">
                                    {userComponent}
                                    <div>
                                        <button onClick={() => { handleNewUserClick('register') }} className="btn btn-link">New User Register</button>
                                    </div>
                                </div>
                                <div className="tab-pane" id="admin">
                                    <AdminLogin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-5 p-4">
                <hr />
                <div className="fs-2 fw-bold">
                    Browse by Discipline
                </div>
                <div className="fs-5 fw-bold text-secondary">
                    Expert-led paths designed for professional growth.
                </div>

                <div className="d-flex mt-5">
                    <Card logo="bi bi-code" title="Programming" subTitle="Master React, Python, and Cloud Infrastructure with real-world projects." courses="140 Courses" />

                    <Card logo="bi bi-feather" title="Design" subTitle="UI/UX fundamentals, Design Systems, and advanced Typography techniques." courses="89 Courses" />

                    <Card logo="bi bi-graph-up-arrow" title="Marketing" subTitle="Performance analytics, brand strategy, and social media growth engineering." courses="42 Courses" />

                </div>
            </div>

        </div>
    )
}