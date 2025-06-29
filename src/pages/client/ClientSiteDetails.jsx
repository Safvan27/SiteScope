import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
} from "recharts";

const ClientSiteDetails = ({ site, onBack }) => {
    const progressData = [
        {
            name: "Progress",
            uv: site.progress,
            fill: "#10b981", // Tailwind emerald-500
        },
    ];

    return (
        <div className="space-y-6 px-4 md:px-10 py-6">
            <Button onClick={onBack}>← Back to Sites</Button>

            <Card className="shadow-xl bg-white/60 border border-gray-200/60 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {site.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {site.location} | Started on: {site.startDate}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Top Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-2 text-sm">
                            <div>
                                <strong>Status:</strong>{" "}
                                <Badge variant="outline">{site.status}</Badge>
                            </div>
                            <div>
                                <strong>Estimated Completion:</strong>{" "}
                                {site.estimatedCompletion || "TBD"}
                            </div>
                        </div>

                        {/* Recharts Progress Chart */}
                        <div className="w-full flex justify-center">
                            <ResponsiveContainer width={180} height={180}>
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    barSize={14}
                                    data={progressData}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        background
                                        clockWise
                                        dataKey="uv"
                                    />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-lg font-semibold text-muted-foreground"
                                    >
                                        {site.progress}%
                                    </text>
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <Separator />

                    {/* Photos */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">
                            Site Photos
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {site.images?.length > 0 ? (
                                site.images.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Site ${index + 1}`}
                                        className="rounded-lg w-full h-40 object-cover"
                                    />
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm col-span-3">
                                    No photos uploaded yet.
                                </p>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Notes */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2">
                            Recent Updates
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {site.notes?.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Milestones */}
                    {site.milestones?.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h4 className="font-semibold text-lg mb-2">
                                    Milestones
                                </h4>
                                <ul className="space-y-2">
                                    {site.milestones.map((m, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center p-3 border rounded-md text-sm"
                                        >
                                            <span>{m.name}</span>
                                            <Badge
                                                variant={
                                                    m.status === "Completed"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {m.status}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Files */}
                    {site.files?.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h4 className="font-semibold text-lg mb-2">
                                    Project Files
                                </h4>
                                <ul className="text-sm space-y-2">
                                    {site.files.map((file, index) => (
                                        <li key={index}>
                                            <a
                                                href={file.url}
                                                className="text-blue-600 underline"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                📎 {file.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientSiteDetails;
