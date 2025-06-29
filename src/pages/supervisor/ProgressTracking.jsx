// src/pages/supervisor/ProgressTracking.jsx
import React, { useState } from "react";
import SiteProgress from "./SiteProgress";
import SiteList from "./SiteList";
import DashboardHeader from "@/components/common/DashboardHeader";
import { sites, dummyData } from "./data";

const ProgressTracking = () => {
    const [selectedSite, setSelectedSite] = useState(null);

    const handleSelect = (site) => {
        setSelectedSite(site);
    };

    const handleBack = () => {
        setSelectedSite(null);
    };

    return (
        <div className="supervisor-dashboard p-6 space-y-6">
            <DashboardHeader title="Site Progress Tracking" />
            {!selectedSite ? (
                <SiteList sites={sites} onSelect={handleSelect} />
            ) : (
                <SiteProgress
                    site={selectedSite}
                    data={dummyData[selectedSite.id]}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default ProgressTracking;
