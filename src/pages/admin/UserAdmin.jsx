import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardHeader from "../../components/common/DashboardHeader";

const UserAdmin = () => {
    const [users] = useState([
        {
            id: 1,
            name: "John Smith",
            email: "john@example.com",
            role: "supervisor",
            status: "Active",
            sites: ["Downtown Office Complex"],
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "jane@example.com",
            role: "supervisor",
            status: "Active",
            sites: ["Residential Tower"],
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "client",
            status: "Active",
            sites: ["Downtown Office Complex"],
        },
    ]);

    const getRoleColor = (role) => {
        switch (role) {
            case "admin":
                return "destructive";
            case "supervisor":
                return "primary";
            case "client":
                return "success";
            default:
                return "secondary";
        }
    };

    return (
        <div className="admin-dashboard p-6 space-y-6">
            <DashboardHeader title="User Administration" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="shadow-lg backdrop-blur-md bg-white/30"
                    >
                        <CardHeader className="flex justify-between items-start">
                            <CardTitle className="text-xl font-semibold">
                                {user.name}
                            </CardTitle>
                            <Badge variant={getRoleColor(user.role)}>
                                {user.role.toUpperCase()}
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-1 text-sm text-white">
                            <p>
                                <strong className="text-foreground">
                                    Email:
                                </strong>{" "}
                                {user.email}
                            </p>
                            <p>
                                <strong className="text-foreground">
                                    Status:
                                </strong>{" "}
                                {user.status}
                            </p>
                            <p>
                                <strong className="text-foreground">
                                    Sites:
                                </strong>{" "}
                                {user.sites.join(", ")}
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Edit</Button>
                            <Button variant="destructive">Deactivate</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserAdmin;
