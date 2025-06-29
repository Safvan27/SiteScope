import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const SiteForm = ({ onSubmit, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        location: initialData.location || "",
        status: initialData.status || "not_started",
        supervisor: initialData.supervisor || "",
        client: initialData.client || "",
        budget: initialData.budget || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        description: initialData.description || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Card className="w-full ">
            <CardHeader>
                <CardTitle>
                    {initialData.id ? "Edit Site" : "Create New Site"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Site Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Status & Budget */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) =>
                                    handleChange({
                                        target: { name: "status", value },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not_started">
                                        Not Started
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="on_hold">
                                        On Hold
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="budget">Budget</Label>
                            <Input
                                id="budget"
                                name="budget"
                                type="number"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Supervisor & Client */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="supervisor">Supervisor</Label>
                            <Input
                                id="supervisor"
                                name="supervisor"
                                value={formData.supervisor}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="client">Client</Label>
                            <Input
                                id="client"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {initialData.id ? "Update Site" : "Create Site"}
                    </Button>
                </div>
            </CardFooter>
        </Card>

        // <div className="space-y-6 m-5">
        //     <h2 className="text-2xl font-semibold tracking-tight">
        //         {initialData.id ? "Edit Site" : "Create New Site"}
        //     </h2>

        //     <form onSubmit={handleSubmit} className="space-y-6">
        //         {/* Site Name */}
        //         <div className="space-y-2">
        //             <Label htmlFor="name">Site Name *</Label>
        //             <Input
        //                 id="name"
        //                 name="name"
        //                 value={formData.name}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>

        //         {/* Location */}
        //         <div className="space-y-2">
        //             <Label htmlFor="location">Location *</Label>
        //             <Input
        //                 id="location"
        //                 name="location"
        //                 value={formData.location}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>

        //         {/* Status & Budget */}
        //         <div className="flex flex-col md:flex-row gap-4">
        //             <div className="flex-1 space-y-2">
        //                 <Label>Status</Label>
        //                 <Select
        //                     value={formData.status}
        //                     onValueChange={(value) =>
        //                         handleChange({
        //                             target: { name: "status", value },
        //                         })
        //                     }
        //                 >
        //                     <SelectTrigger>
        //                         <SelectValue placeholder="Select status" />
        //                     </SelectTrigger>
        //                     <SelectContent>
        //                         <SelectItem value="not_started">
        //                             Not Started
        //                         </SelectItem>
        //                         <SelectItem value="in_progress">
        //                             In Progress
        //                         </SelectItem>
        //                         <SelectItem value="completed">
        //                             Completed
        //                         </SelectItem>
        //                         <SelectItem value="on_hold">On Hold</SelectItem>
        //                     </SelectContent>
        //                 </Select>
        //             </div>

        //             <div className="flex-1 space-y-2">
        //                 <Label htmlFor="budget">Budget</Label>
        //                 <Input
        //                     id="budget"
        //                     name="budget"
        //                     type="number"
        //                     value={formData.budget}
        //                     onChange={handleChange}
        //                     placeholder="0"
        //                 />
        //             </div>
        //         </div>

        //         {/* Supervisor & Client */}
        //         <div className="flex flex-col md:flex-row gap-4">
        //             <div className="flex-1 space-y-2">
        //                 <Label htmlFor="supervisor">Supervisor</Label>
        //                 <Input
        //                     id="supervisor"
        //                     name="supervisor"
        //                     value={formData.supervisor}
        //                     onChange={handleChange}
        //                 />
        //             </div>

        //             <div className="flex-1 space-y-2">
        //                 <Label htmlFor="client">Client</Label>
        //                 <Input
        //                     id="client"
        //                     name="client"
        //                     value={formData.client}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>

        //         {/* Dates */}
        //         <div className="flex flex-col md:flex-row gap-4">
        //             <div className="flex-1 space-y-2">
        //                 <Label htmlFor="startDate">Start Date</Label>
        //                 <Input
        //                     id="startDate"
        //                     name="startDate"
        //                     type="date"
        //                     value={formData.startDate}
        //                     onChange={handleChange}
        //                 />
        //             </div>

        //             <div className="flex-1 space-y-2">
        //                 <Label htmlFor="endDate">End Date</Label>
        //                 <Input
        //                     id="endDate"
        //                     name="endDate"
        //                     type="date"
        //                     value={formData.endDate}
        //                     onChange={handleChange}
        //                 />
        //             </div>
        //         </div>

        //         {/* Description */}
        //         <div className="space-y-2">
        //             <Label htmlFor="description">Description</Label>
        //             <Textarea
        //                 id="description"
        //                 name="description"
        //                 value={formData.description}
        //                 onChange={handleChange}
        //                 rows={4}
        //             />
        //         </div>

        //         {/* Actions */}
        //         <div className="flex justify-end gap-4">
        //             <Button variant="outline" type="button" onClick={onCancel}>
        //                 Cancel
        //             </Button>
        //             <Button type="submit">
        //                 {initialData.id ? "Update Site" : "Create Site"}
        //             </Button>
        //         </div>
        //     </form>
        // </div>
    );
};

export default SiteForm;
