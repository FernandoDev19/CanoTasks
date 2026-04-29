import "@/global.css";
import { Task } from "@/types/task.type";
import { Text, useColorScheme, View } from "react-native";
import Checkbox from "./ui/checkbox";

type Props = {
    task: Task;
    onComplete: (id: string) => void;
};

export default function taskItem({ task, onComplete }: Props) {
    const colorScheme = useColorScheme() ?? "light";

    const handleComplete = (id: string) => {
        onComplete(id);
    };

    return (
        <View
            className={`flex-row gap-4 bg-white shadow-lg rounded-2xl p-4 mb-4 border-l-4 ${
                task.priority === "high"
                    ? "border-error"
                    : task.priority === "medium"
                      ? "border-warning"
                      : "border-success"
            }`}
        >
            <Checkbox
                checked={task.isCompleted}
                onChange={() => {
                    handleComplete(task.id);
                }}
            />

            <View className="flex-1 flex-col gap-2">
                <View className="flex-row justify-between items-center">
                    <Text
                        key={task.id + task.isCompleted}
                        className="text-xl font-bold w-2/3 text-neutral-900"
                    >
                        {task.title || "Tarea sin título"}
                    </Text>
                    <Text
                        className={`text-sm ${
                            task.priority === "low" && "text-green-500"
                        } ${task.priority === "medium" && "text-yellow-500"} ${
                            task.priority === "high" && "text-red-500"
                        }`}
                    >
                        {task.priority === "low" && "Baja"}
                        {task.priority === "medium" && "Media"}
                        {task.priority === "high" && "Alta"}
                    </Text>
                </View>

                {task.description && (
                    <Text className="text-neutral-500">{task.description}</Text>
                )}

                <View className="flex-col">
                    <View className="flex-row">
                        <Text className="font-extrabold text-sm text-neutral-400">
                            Inicio:{" "}
                        </Text>
                        <Text className="text-neutral-400">
                            {new Date(task.startDate).toLocaleDateString(
                                "es-CO",
                            )}
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="font-extrabold text-sm text-neutral-400">
                            Final:{" "}
                        </Text>
                        <Text className="text-neutral-400">
                            {new Date(task.endDate).toLocaleDateString("es-CO")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
