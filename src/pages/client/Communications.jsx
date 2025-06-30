import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import DashboardHeader from "../../components/common/DashboardHeader";

const Communications = () => {
    const [expanded, setExpanded] = useState(null);

    const [messages] = useState([
        {
            id: 1,
            from: "John Smith (Supervisor)",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            subject: "Weekly Progress Update",
            date: "2024-04-10",
            content:
                "This week we completed the electrical rough-in and started on plumbing.",
            read: true,
        },
        {
            id: 2,
            from: "System",
            avatar: "",
            subject: "Milestone Achieved",
            date: "2024-04-08",
            content: "Congratulations! The structure phase has been completed.",
            read: false,
        },
        {
            id: 3,
            from: "John Smith (Supervisor)",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            subject: "Weather Delay Notice",
            date: "2024-04-05",
            content:
                "Due to heavy rain, outdoor work will be delayed by 2 days.",
            read: true,
        },
    ]);

    const toggleExpand = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className="client-dashboard p-6 space-y-6">
            <DashboardHeader title="Communications" />
            <div className="grid gap-4">
                {messages.map((msg) => (
                    <Card
                        key={msg.id}
                        className={`border ${
                            !msg.read
                                ? "border-blue-500 shadow-md bg-blue-50/50"
                                : "bg-white"
                        }`}
                    >
                        <CardHeader className="flex items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    {msg.avatar ? (
                                        <AvatarImage src={msg.avatar} />
                                    ) : (
                                        <AvatarFallback>
                                            {msg.from
                                                .split(" ")[0]
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div>
                                    <CardTitle className="text-md">
                                        {msg.subject}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {msg.from}
                                    </CardDescription>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {!msg.read && (
                                    <Badge variant="secondary">Unread</Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {msg.date}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleExpand(msg.id)}
                                >
                                    {expanded === msg.id ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </CardHeader>

                        {expanded === msg.id && (
                            <>
                                <Separator />
                                <CardContent className="text-sm p-4 pt-2 text-muted-foreground">
                                    {msg.content}
                                </CardContent>
                            </>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Communications;
