import React, { useState } from "react";
import DashboardHeader from "../../components/common/DashboardHeader";
import { SiteManager, SiteForm } from "../../components/admin";
const SiteManagement = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [sites, setSites] = useState([
        {
            id: 1,
            name: "Downtown Office Complex",
            location: "New York, NY",
            status: "in_progress",
            supervisor: "John Smith",
            client: "ABC Corp",
            startDate: "2024-01-15",
            endDate: "2024-06-30",
            budget: 2500000,
        },
        {
            id: 2,
            name: "Residential Tower",
            location: "Los Angeles, CA",
            status: "in_progress",
            supervisor: "Jane Doe",
            client: "XYZ Developers",
            startDate: "2024-02-01",
            endDate: "2024-08-15",
            budget: 5000000,
        },
    ]);

    const handleCreateSite = (siteData) => {
        const newSite = {
            ...siteData,
            id: sites.length + 1,
        };
        setSites([...sites, newSite]);
        setShowCreateForm(false);
    };

    const handleDeleteSite = (siteId) => {
        setSites(sites.filter((site) => site.id !== siteId));
    };

    return (
        <div className="admin-dashboard p-6 space-y-6">
            <DashboardHeader title="Site Management" />
            <div className="page-header flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white ms-2">
                    Site Management
                </h1>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition me-2"
                    onClick={() => setShowCreateForm(true)}
                >
                    + Create New Site
                </button>
            </div>
            {showCreateForm && (
                <div className="fixed inset-0  flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-background rounded-xl shadow-lg max-w-3xl w-full p-6">
                        <SiteForm
                            onSubmit={handleCreateSite}
                            onCancel={() => setShowCreateForm(false)}
                        />
                    </div>
                </div>
            )}
            {!showCreateForm && (
                <SiteManager sites={sites} onDeleteSite={handleDeleteSite} />
            )}
        </div>
    );
};

export default SiteManagement;
