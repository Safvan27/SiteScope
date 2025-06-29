import React, { useState } from "react";
import DashboardHeader from "../../components/common/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminReport = () => {
    const [reportType, setReportType] = useState("site");
    const [selectedItem, setSelectedItem] = useState("");
    const [reportContent, setReportContent] = useState("");

    const handleGenerateReport = () => {
        // logic to fetch or generate the report
        setReportContent(`Generated ${reportType} report for: ${selectedItem}`);
    };

    const handleSendReport = () => {
        // logic to send the report
        alert(`Report sent for ${selectedItem}`);
    };

    return (
        <div className="admin-dashboard p-6 space-y-6">
            <DashboardHeader title="Admin Reports" />
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Generate and Send Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2">Report Type</Label>
                            <Select
                                onValueChange={setReportType}
                                value={reportType}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="site">
                                        Individual Site
                                    </SelectItem>
                                    <SelectItem value="supervisor">
                                        Supervisor Work
                                    </SelectItem>
                                    <SelectItem value="client">
                                        Client Activity
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2">
                                Select{" "}
                                {reportType === "site"
                                    ? "Site"
                                    : reportType === "supervisor"
                                    ? "Supervisor"
                                    : "Client"}
                            </Label>
                            <Input
                                placeholder={`Enter ${reportType} name`}
                                value={selectedItem}
                                onChange={(e) =>
                                    setSelectedItem(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <Button onClick={handleGenerateReport} className="w-full">
                        Generate Report
                    </Button>

                    {reportContent && (
                        <>
                            <Label>Report Content</Label>
                            <Textarea value={reportContent} rows={6} readOnly />
                            <Button
                                onClick={handleSendReport}
                                variant="outline"
                                className="mt-2 w-full"
                            >
                                Send Report
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminReport;
