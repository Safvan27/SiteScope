import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DashboardHeader from "../../components/common/DashboardHeader";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Install Electrical Wiring",
            status: "in_progress",
            assignee: "Mike Johnson",
            dueDate: "2024-04-15",
            priority: "high",
        },
        {
            id: 2,
            title: "Plumbing Installation",
            status: "pending",
            assignee: "Sarah Wilson",
            dueDate: "2024-04-20",
            priority: "medium",
        },
        {
            id: 3,
            title: "Drywall Installation",
            status: "completed",
            assignee: "Tom Brown",
            dueDate: "2024-04-10",
            priority: "low",
        },
    ]);

    const [editTask, setEditTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: "",
        assignee: "",
        dueDate: "",
        priority: "medium",
        status: "pending",
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-500";
            case "in_progress":
                return "bg-blue-500";
            case "pending":
                return "bg-yellow-500";
            case "blocked":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    const handleAddTask = () => {
        const taskWithId = { ...newTask, id: Date.now() };
        setTasks((prev) => [...prev, taskWithId]);
        setNewTask({
            title: "",
            assignee: "",
            dueDate: "",
            priority: "medium",
            status: "pending",
        });
    };

    const handleUpdateTask = () => {
        setTasks((prev) =>
            prev.map((task) => (task.id === editTask.id ? editTask : task))
        );
        setEditTask(null);
    };

    return (
        <div className="supervisor-dashboard p-6 space-y-6">
            <DashboardHeader title="Task Management" />
            <div className="flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add New Task</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    value={newTask.title}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Assignee</Label>
                                <Input
                                    value={newTask.assignee}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            assignee: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Due Date</Label>
                                <Input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            dueDate: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Priority</Label>
                                <Select
                                    value={newTask.priority}
                                    onValueChange={(value) =>
                                        setNewTask({
                                            ...newTask,
                                            priority: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleAddTask}>Save Task</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <Card key={task.id} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {task.title}
                                <Badge className={getStatusColor(task.status)}>
                                    {task.status
                                        .replace("_", " ")
                                        .toUpperCase()}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>
                                <strong>Assignee:</strong> {task.assignee}
                            </p>
                            <p>
                                <strong>Due Date:</strong> {task.dueDate}
                            </p>
                            <p>
                                <strong>Priority:</strong>{" "}
                                <Badge variant="outline">{task.priority}</Badge>
                            </p>
                            <div className="flex gap-2 mt-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setEditTask(task)}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Task</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Title</Label>
                                                <Input
                                                    value={
                                                        editTask?.title || ""
                                                    }
                                                    onChange={(e) =>
                                                        setEditTask({
                                                            ...editTask,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Assignee</Label>
                                                <Input
                                                    value={
                                                        editTask?.assignee || ""
                                                    }
                                                    onChange={(e) =>
                                                        setEditTask({
                                                            ...editTask,
                                                            assignee:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Due Date</Label>
                                                <Input
                                                    type="date"
                                                    value={
                                                        editTask?.dueDate || ""
                                                    }
                                                    onChange={(e) =>
                                                        setEditTask({
                                                            ...editTask,
                                                            dueDate:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Label>Priority</Label>
                                                <Select
                                                    value={
                                                        editTask?.priority || ""
                                                    }
                                                    onValueChange={(value) =>
                                                        setEditTask({
                                                            ...editTask,
                                                            priority: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select priority" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="high">
                                                            High
                                                        </SelectItem>
                                                        <SelectItem value="medium">
                                                            Medium
                                                        </SelectItem>
                                                        <SelectItem value="low">
                                                            Low
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button onClick={handleUpdateTask}>
                                                Update Task
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button size="sm">Update Status</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TaskManagement;
