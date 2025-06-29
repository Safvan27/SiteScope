import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "../../types";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ApiService from "../../services/api";

const DashboardHeader = ({ title, showBackButton = true }) => {
    const { user, setUser, logout } = useAuth();
    const [value, setValue] = useState(user.status);
    const navigate = useNavigate();

    const getDashboardRoute = () => {
        switch (user.role) {
            case USER_ROLES.ADMIN:
                return "/admin/dashboard";
            case USER_ROLES.SUPERVISOR:
                return "/supervisor/dashboard";
            case USER_ROLES.CLIENT:
                return "/client/dashboard";
            default:
                return "/login";
        }
    };

    const handleBackToDashboard = () => {
        navigate(getDashboardRoute());
    };

    const handleStatusUpdate = async (status) => {
        try {
            const updatedUser = await ApiService.updateUser(user.id, {
                status: status,
            });
            setValue(status);
            setUser(updatedUser);
        } catch (error) {
            console.error("Failed to update status:", error.message);
        }
    };

    return (
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg rounded-xl px-6 py-4 flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                {showBackButton && (
                    <Button variant="outline" onClick={handleBackToDashboard}>
                        ← Back to Dashboard
                    </Button>
                )}
                <h1 className="text-xl font-semibold tracking-wide text-white">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-4 text-white">
                <span className="font-medium">Welcome, {user.name}</span>

                {user.role === USER_ROLES.SUPERVISOR && (
                    <Select value={value} onValueChange={handleStatusUpdate}>
                        <SelectTrigger className="w-[180px] bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="z-[9999] bg-white/5 backdrop-blur-md border border-white/20 text-white">
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="active">
                                    🟢 Active
                                </SelectItem>
                                <SelectItem value="away">🟡 Away</SelectItem>
                                <SelectItem value="offline">
                                    🔴 Offline
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}

                <Button
                    onClick={logout}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                >
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default DashboardHeader;
