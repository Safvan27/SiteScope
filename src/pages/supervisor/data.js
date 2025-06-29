const sites = [
    {
        id: 1,
        name: "Downtown Office Complex",
        image: "https://source.unsplash.com/600x400/?construction,building",
        location: "Kochi, Kerala",
        startDate: "2024-01-15",
        endDate: "2025-02-28",
        supervisor: "John Smith",
        numWorkers: 48,
        currentStatus: "In Progress",
        overallProgress: 65,
    },
    {
        id: 2,
        name: "Green Valley Apartments",
        image: "https://source.unsplash.com/600x400/?apartment,site",
        location: "Calicut, Kerala",
        startDate: "2023-10-01",
        endDate: "2025-03-15",
        supervisor: "Jane Doe",
        numWorkers: 32,
        currentStatus: "In Progress",
        overallProgress: 52,
    },
    {
        id: 3,
        name: "Seaside Villa Project",
        image: "https://source.unsplash.com/600x400/?villa,construction",
        location: "Alappuzha, Kerala",
        startDate: "2024-05-10",
        endDate: "2026-01-20",
        supervisor: "Bob Johnson",
        numWorkers: 25,
        currentStatus: "Planning",
        overallProgress: 10,
    },
];

const dummyData = {
    1: {
        images: [
            { url: "/images/client.jpg", phase: "Foundation" },
            { url: "/images/supervisor.jpg", phase: "Electrical" },
            { url: "/images/two-men.jpg", phase: "Plumbing" },
        ],
        progress: {
            overall: 65,
            phases: [
                { name: "Foundation", progress: 100, status: "completed" },
                { name: "Electrical", progress: 75, status: "in_progress" },
                { name: "Finishing", progress: 0, status: "pending" },
            ],
        },
    },
    2: {
        images: [
            { url: "/images/supervisor.jpg", phase: "Foundation" },
            { url: "/images/client.jpg", phase: "Electrical" },
            { url: "/images/two-men.jpg", phase: "Plumbing" },
        ],
        progress: {
            overall: 40,
            phases: [
                { name: "Foundation", progress: 30, status: "completed" },
                { name: "Electrical", progress: 75, status: "in_progress" },
                { name: "Finishing", progress: 20, status: "pending" },
            ],
        },
    },
};

export { sites, dummyData };
