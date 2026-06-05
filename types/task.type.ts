export type Task = {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: "low" | "medium" | "high";
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
};
