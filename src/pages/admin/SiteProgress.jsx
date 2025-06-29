// src/pages/supervisor/SiteProgress.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SiteProgress = ({ site, data, onBack }) => {
    const [selectedPhase, setSelectedPhase] = useState("all");
    const images = data?.images || [];
    const progress = data?.progress || {};

    const filteredImages =
        selectedPhase === "all"
            ? images
            : images.filter((img) => img.phase === selectedPhase);

    return (
        <div className="space-y-6">
            <Button variant="outline" onClick={onBack}>
                ← Back to Site List
            </Button>

            <h2 className="text-2xl font-bold text-white">
                {site.name} - Progress Details
            </h2>

            {/* Images + Filter */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <Tabs
                        value={selectedPhase}
                        onValueChange={setSelectedPhase}
                    >
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            {[...new Set(images.map((img) => img.phase))].map(
                                (phase) => (
                                    <TabsTrigger key={phase} value={phase}>
                                        {phase}
                                    </TabsTrigger>
                                )
                            )}
                        </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {filteredImages.map((img, index) => (
                            <Card key={index} className="overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.phase}
                                    className="w-full h-32 object-cover"
                                />
                                <CardContent className="text-sm text-muted-foreground mt-1">
                                    {img.phase}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Overall Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={progress.overall} className="h-4 mb-2" />
                    <div className="text-right text-sm text-muted-foreground">
                        {progress.overall}% Complete
                    </div>
                </CardContent>
            </Card>

            {/* Phase Progress */}
            <div className="grid gap-4">
                {progress.phases?.map((phase, index) => (
                    <Card key={index}>
                        <CardHeader className="flex justify-between items-center pb-1">
                            <CardTitle className="text-base">
                                {phase.name}
                            </CardTitle>
                            <span className="text-muted-foreground text-sm">
                                {phase.progress}%
                            </span>
                        </CardHeader>
                        <CardContent>
                            <Progress value={phase.progress} />
                            <p className="text-xs text-muted-foreground mt-1">
                                {phase.status.replace("_", " ").toUpperCase()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-3">
                <Button variant="default">Add Progress Update</Button>
                <Button variant="secondary">Upload Photos</Button>
            </div>
        </div>
    );
};

export default SiteProgress;
