import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SiteList = ({ sites, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
                <Card
                    key={site.id}
                    className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden"
                >
                    {site.imageUrl && (
                        <img
                            src={site.imageUrl}
                            alt={site.name}
                            className="w-full h-40 object-cover"
                        />
                    )}
                    <CardContent className="p-4 space-y-2 text-sm">
                        <CardTitle className="text-xl font-semibold mb-2">
                            {site.name}
                        </CardTitle>
                        <div className="text-muted-foreground space-y-1">
                            <p>
                                <strong>Location:</strong> {site.location}
                            </p>
                            <p>
                                <strong>Supervisor:</strong> {site.supervisor}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <Badge>{site.status}</Badge>
                            </p>
                            <p>
                                <strong>Progress:</strong> {site.progress}%
                            </p>
                            <p>
                                <strong>Phases Completed:</strong>{" "}
                                {site.completedPhases}/{site.totalPhases}
                            </p>
                            <p>
                                <strong>Workers:</strong> {site.workerCount}
                            </p>
                            <p>
                                <strong>Start Date:</strong> {site.startDate}
                            </p>
                            <p>
                                <strong>Deadline:</strong> {site.deadline}
                            </p>
                            <p>
                                <strong>Last Updated:</strong>{" "}
                                {site.lastUpdated}
                            </p>
                            <p>
                                <strong>Client:</strong> {site.clientName}
                            </p>
                            <p>
                                <strong>Site Type:</strong> {site.siteType}
                            </p>
                            <p>
                                <strong>Budget Used:</strong> {site.budgetUsed}%
                            </p>
                        </div>
                        <Progress value={site.progress} className="h-2" />
                        <Button
                            className="mt-4 w-full"
                            onClick={() => onSelect(site)}
                        >
                            View Details
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SiteList;
