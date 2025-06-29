import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/common/DashboardHeader";

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="client-dashboard p-6 space-y-6">
            <DashboardHeader title="Client Dashboard" showBackButton={false} />

            <div className="dashboard-content">
                <div className="project-overview">
                    <h3
                        style={{
                            color: "#ffffff",
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        Your Construction Project
                    </h3>
                    <div
                        className="project-card"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(15px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            color: "#ffffff",
                        }}
                    >
                        <h4
                            style={{
                                color: "#ffffff",
                                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            Downtown Office Complex
                        </h4>
                        <div className="progress-section">
                            <div
                                className="progress-bar"
                                style={{
                                    background: "rgba(255, 255, 255, 0.2)",
                                }}
                            >
                                <div
                                    className="progress-fill"
                                    style={{ width: "65%" }}
                                ></div>
                            </div>
                            <span
                                className="progress-text"
                                style={{
                                    color: "#ffffff",
                                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                65% Complete
                            </span>
                        </div>
                        <div className="project-details">
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <strong>Supervisor:</strong> John Smith
                            </p>
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <strong>Start Date:</strong> January 15, 2024
                            </p>
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <strong>Expected Completion:</strong> June 30,
                                2024
                            </p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Recent Updates</h3>
                        <div className="card-content">
                            <div className="stat-number">3</div>
                            <p>New updates this week</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Photos</h3>
                        <div className="card-content">
                            <div className="stat-number">45</div>
                            <p>Total progress photos</p>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <h3>Timeline</h3>
                        <div className="card-content">
                            <div className="stat-number">On Track</div>
                            <p>Project status</p>
                        </div>
                    </div>
                </div>

                <div className="quick-actions">
                    <h3>Quick Access</h3>
                    <div className="action-buttons">
                        <button
                            className="action-btn"
                            onClick={() => navigate("/client/progress")}
                        >
                            View Progress
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate("/client/gallery")}
                        >
                            Photo Gallery
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate("/client/timeline")}
                        >
                            Timeline
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => navigate("/client/communications")}
                        >
                            Contact Supervisor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
