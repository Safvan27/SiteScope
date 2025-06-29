import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ClientSiteList = ({ sites, onSiteClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
                <Card
                    key={site.id}
                    className="cursor-pointer hover:shadow-xl transition"
                    onClick={() => onSiteClick(site)}
                >
                    <CardHeader>
                        <img
                            src={site.image}
                            alt={site.name}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <CardTitle>{site.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                        <p>
                            <strong>Location:</strong> {site.location}
                        </p>
                        <p>
                            <strong>Start Date:</strong> {site.startDate}
                        </p>
                        <div className="mt-2">
                            <Progress value={site.progress} />
                            <p className="text-xs mt-1">
                                {site.progress}% complete
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ClientSiteList;
