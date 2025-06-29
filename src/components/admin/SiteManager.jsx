import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SiteManager = ({ sites, onDeleteSite }) => {
    return (
        <div className="overflow-auto rounded-xl border border-gray-200 shadow-md m-5">
            <div className="p-4 rounded-xl bg-white shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Site Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Supervisor</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Timeline</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sites.map((site) => (
                            <TableRow key={site.id}>
                                <TableCell>{site.name}</TableCell>
                                <TableCell>{site.location}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            site.status === "in_progress"
                                                ? "default"
                                                : site.status === "completed"
                                                ? "success"
                                                : "destructive"
                                        }
                                    >
                                        {site.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>{site.supervisor}</TableCell>
                                <TableCell>{site.client}</TableCell>
                                <TableCell>
                                    ${site.budget?.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {site.startDate} - {site.endDate}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="secondary">
                                            View
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                onDeleteSite(site.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SiteManager;
