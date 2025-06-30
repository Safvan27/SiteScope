import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, CheckCircle, Flag, TrendingUp } from "lucide-react";
import DashboardHeader from "../../components/common/DashboardHeader";

const eventIcons = {
    milestone: <Flag className="h-4 w-4 text-purple-600" />,
    completion: <CheckCircle className="h-4 w-4 text-green-600" />,
    start: <CalendarDays className="h-4 w-4 text-blue-600" />,
    update: <TrendingUp className="h-4 w-4 text-yellow-500" />,
};

const Timeline = () => {
    const timelineEvents = [
        {
            date: "2024-01-15",
            title: "Project Started",
            description: "Construction officially began",
            type: "milestone",
        },
        {
            date: "2024-02-01",
            title: "Foundation Complete",
            description: "Foundation work finished ahead of schedule",
            type: "completion",
        },
        {
            date: "2024-03-15",
            title: "Structure Work Started",
            description: "Beginning structural framework",
            type: "start",
        },
        {
            date: "2024-04-10",
            title: "Progress Update",
            description: "Structure 80% complete",
            type: "update",
        },
    ];

    return (
        <div className="client-dashboard p-6 space-y-6">
            <DashboardHeader title="Project Timeline" />

            <div className="relative border-l-2 border-muted-foreground/20 ml-4 pl-6">
                {timelineEvents.map((event, index) => (
                    <div key={index} className="mb-10 relative">
                        {/* Icon Marker */}
                        <div className="absolute -left-[30px] top-1 bg-white border-2 border-muted rounded-full p-1">
                            {eventIcons[event.type]}
                        </div>

                        <Card className="shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base">
                                        {event.title}
                                    </CardTitle>
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {event.date}
                                    </Badge>
                                </div>
                                <CardDescription className="capitalize text-xs text-muted-foreground mt-1">
                                    {event.type}
                                </CardDescription>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-3 text-sm text-muted-foreground">
                                {event.description}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
