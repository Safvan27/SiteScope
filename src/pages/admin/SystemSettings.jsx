import React, { useState } from "react";
import DashboardHeader from "../../components/common/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        siteName: "Construction Tracker",
        emailNotifications: true,
        autoReports: true,
        backupFrequency: "daily",
        maintenanceMode: false,
    });

    const handleSettingChange = (setting, value) => {
        setSettings({
            ...settings,
            [setting]: value,
        });
    };

    return (
        <div className="admin-dashboard p-6 space-y-6">
            <DashboardHeader title="System Settings" />
            <div className="dashboard-content grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="siteName">Site Name</Label>
                            <Input
                                id="siteName"
                                value={settings.siteName}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "siteName",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Email Notifications</Label>
                            <Switch
                                checked={settings.emailNotifications}
                                onCheckedChange={(value) =>
                                    handleSettingChange(
                                        "emailNotifications",
                                        value
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Automatic Reports</Label>
                            <Switch
                                checked={settings.autoReports}
                                onCheckedChange={(value) =>
                                    handleSettingChange("autoReports", value)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="backupFrequency">
                                Backup Frequency
                            </Label>
                            <Select
                                value={settings.backupFrequency}
                                onValueChange={(value) =>
                                    handleSettingChange(
                                        "backupFrequency",
                                        value
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">
                                        Weekly
                                    </SelectItem>
                                    <SelectItem value="monthly">
                                        Monthly
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Maintenance Mode</Label>
                            <Switch
                                checked={settings.maintenanceMode}
                                onCheckedChange={(value) =>
                                    handleSettingChange(
                                        "maintenanceMode",
                                        value
                                    )
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button className="btn-primary">Save Settings</Button>
                    <Button variant="outline" className="btn-secondary">
                        Reset to Defaults
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
