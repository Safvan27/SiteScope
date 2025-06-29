// ClientProgress.jsx
import React, { useState } from "react";
import ClientSiteList from "./ClientSiteList";
import ClientSiteDetails from "./ClientSiteDetails";
import DashboardHeader from "../../components/common/DashboardHeader";

const ClientProgress = () => {
    const [selectedSite, setSelectedSite] = useState(null);
    const sites = [
        {
            id: 1,
            name: "Green Valley Villa",
            location: "Kochi",
            image: "/images/supervisor.jpg",
            startDate: "2024-04-01",
            estimatedCompletion: "2024-11-30",
            status: "Ongoing",
            progress: 72,
            notes: [
                "Electrical wiring completed on first floor.",
                "Tiling started on second floor.",
                "Window fittings scheduled next week.",
            ],
            images: ["/images/two-men.jpg", "/images/supervisor.jpg"],
            milestones: [
                { name: "Foundation Complete", status: "Completed" },
                { name: "Structural Framing", status: "Completed" },
                { name: "Roofing", status: "Pending" },
            ],
            files: [
                {
                    name: "Blueprint.pdf",
                    url: "https://example.com/blueprint.pdf",
                },
            ],
        },
        {
            id: 2,
            name: "Ocean",
            image: "/images/two-men.jpg",
            location: "Kochi",
            startDate: "2024-04-01",
            estimatedCompletion: "2024-11-30",
            status: "Ongoing",
            progress: 72,
            notes: [
                "Electrical wiring completed on first floor.",
                "Tiling started on second floor.",
                "Window fittings scheduled next week.",
            ],
            images: ["/images/two-men.jpg", "/images/supervisor.jpg"],

            milestones: [
                { name: "Foundation Complete", status: "Completed" },
                { name: "Structural Framing", status: "Completed" },
                { name: "Roofing", status: "Pending" },
            ],
            files: [
                {
                    name: "Blueprint.pdf",
                    url: "https://example.com/blueprint.pdf",
                },
            ],
        },
    ];

    return (
        <div className="client-dashboard p-6 space-y-6">
            <DashboardHeader title="Communications" />
            {!selectedSite ? (
                <ClientSiteList
                    sites={sites}
                    onSiteClick={(site) => setSelectedSite(site)}
                />
            ) : (
                <ClientSiteDetails
                    site={selectedSite}
                    onBack={() => setSelectedSite(null)}
                />
            )}
        </div>
    );
};

export default ClientProgress;
