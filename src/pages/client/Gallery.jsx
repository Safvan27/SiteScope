import React from "react";
import DashboardHeader from "../../components/common/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Gallery = () => {
    const photos = [
        {
            id: 1,
            url: "https://via.placeholder.com/300x200/667eea/ffffff?text=Foundation",
            title: "Foundation Work",
            date: "2024-02-01",
            description: "Foundation completed",
        },
        {
            id: 2,
            url: "https://via.placeholder.com/300x200/764ba2/ffffff?text=Structure",
            title: "Structure Progress",
            date: "2024-03-15",
            description: "Steel framework installation",
        },
        {
            id: 3,
            url: "https://via.placeholder.com/300x200/667eea/ffffff?text=Interior",
            title: "Interior Work",
            date: "2024-04-10",
            description: "Interior installations beginning",
        },
    ];

    return (
        <div className="client-dashboard p-6 space-y-6">
            <DashboardHeader title="Project Gallery" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden shadow-md">
                        <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-40 object-cover"
                        />
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">{photo.title}</h3>
                                <Badge variant="outline">{photo.date}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {photo.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
