import TaskItem from "@/components/taskItem";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "@/global.css";
import { useStorage } from "@/hooks/useStorage";
import { Task } from "@/types/task.type";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, useColorScheme, View } from "react-native";

export default function Tasks() {
    const {
        data: tasks,
        refresh,
        toggle,
        clearCompleted,
    } = useStorage<Task[]>("tasks", []);

    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const [filter, setFilter] = useState<"all" | "completed">("all");

    const completedCount = tasks.filter((t) => t.isCompleted).length;

    const handleAddTask = () => {
        router.push("./create");
    };

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, []),
    );

    const handleComplete = (id: string) => {
        toggle(id);
    };

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={tasks.filter((task) =>
                    filter === "all" ? !task.isCompleted : task.isCompleted,
                )}
                className="px-7 pt-7"
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={() => (
                    <View className="mb-5">
                        <Input
                            type="search"
                            placeholder="Buscar tareas, prioridades..."
                        />

                        <View className="flex-row justify-around gap-2.5 my-5">
                            <Button
                                title="Pendientes"
                                onPress={() => setFilter("all")}
                                color="filter"
                                active={filter === "all"}
                            />
                            <Button
                                title="Completadas"
                                onPress={() => setFilter("completed")}
                                color="filter"
                                active={filter === "completed"}
                            />
                        </View>
                    </View>
                )}
                renderItem={({ item }) => {
                    return <TaskItem task={item} onComplete={handleComplete} />;
                }}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() =>
                    completedCount >= 3 ? (
                        <View className="mt-5">
                            <Button
                                title={`Limpiar ${completedCount} completadas`}
                                onPress={clearCompleted}
                                color="danger"
                            />
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    <Text className="text-2xl font-medium text-neutral-medium text-center mt-8">
                        No hay tareas
                    </Text>
                }
            />
            <Button color="primary" circle={true} onPress={handleAddTask} />
        </View>
    );
}
