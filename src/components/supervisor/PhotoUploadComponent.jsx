import React, { useState } from "react";
import apiService from "../../services/api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sites } from "../../pages/supervisor/data";

const PhotoUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("progress");
    const [selectedSite, setSelectedSite] = useState("");

    const submitUpload = () => {
        if (selectedSite && selectedFiles.length > 0) {
            handleUpload({
                siteId: selectedSite,
                category,
                description,
                files: selectedFiles,
            });
        }
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        try {
            const formData = new FormData();

            // Add form data
            formData.append("category", category);
            formData.append("description", description);
            formData.append("project_id", "1"); // You might want to make this dynamic

            // Add files
            selectedFiles.forEach((file) => {
                formData.append("photos", file);
            });

            // Simulate upload progress for UI
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

                for (let progress = 0; progress <= 100; progress += 20) {
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    setUploadProgress((prev) => ({
                        ...prev,
                        [file.name]: progress,
                    }));
                }
            }

            // Make actual API call
            const response = await apiService.uploadPhotos(formData);

            // Reset form after upload
            setSelectedFiles([]);
            setUploadProgress({});
            setDescription("");
            alert("Photos uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed: " + error.message);
        }
    };

    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="shadow-lg">
                <CardContent className="space-y-6">
                    <CardTitle className="text-2xl font-bold mb-4">
                        Upload Construction Photos
                    </CardTitle>

                    <div className="space-y-2">
                        <Label>Select Site</Label>
                        <Select
                            value={selectedSite}
                            onValueChange={setSelectedSite}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose site..." />
                            </SelectTrigger>
                            <SelectContent>
                                {sites.map((site) => (
                                    <SelectItem key={site.id} value={site.id}>
                                        {site.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Photo Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="progress">
                                    Progress Update
                                </SelectItem>
                                <SelectItem value="quality">
                                    Quality Check
                                </SelectItem>
                                <SelectItem value="safety">
                                    Safety Inspection
                                </SelectItem>
                                <SelectItem value="materials">
                                    Materials
                                </SelectItem>
                                <SelectItem value="equipment">
                                    Equipment
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what these photos show..."
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Select Photos</Label>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 border rounded-md"
                                >
                                    <div className="text-sm">
                                        {file.name} (
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB)
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {uploadProgress[file.name] !==
                                            undefined && (
                                            <div className="w-32">
                                                <Progress
                                                    value={
                                                        uploadProgress[
                                                            file.name
                                                        ]
                                                    }
                                                />
                                            </div>
                                        )}
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeFile(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        onClick={submitUpload}
                        disabled={!selectedSite || selectedFiles.length === 0}
                    >
                        Upload Photos
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default PhotoUploadComponent;
