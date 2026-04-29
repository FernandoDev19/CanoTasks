import Button from "@/components/ui/button";
import { Colors } from "@/constants/theme";
import { useStorage } from "@/hooks/useStorage";
import { Task } from "@/types/task.type";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

export default function Home() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];
    const { data: tasks, refresh } = useStorage<Task[]>("tasks", []);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, []),
    );

    const pendingTasks = tasks.filter((t) => !t.isCompleted).length;
    const completedTasks = tasks.filter((t) => t.isCompleted).length;

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "¡Buenos días!";
        if (hour < 18) return "¡Buenas tardes!";
        return "¡Buenas noches!";
    };

    return (
        <ScrollView className={`flex-1 bg-white`}>
            <View className="px-6 py-10">
                <View className="flex-row justify-between items-center mb-8">
                    <View>
                        <Text className="text-lg text-neutral-400 font-medium">
                            {getTimeGreeting()}
                        </Text>
                        <Text className="text-4xl font-black text-neutral-900 mt-1">
                            Tu resumen diario
                        </Text>
                    </View>
                </View>

                <View className="flex-row gap-5 mb-8">
                    <View className="bg-primary-light flex-1 p-5 gap-2 rounded-3xl justify-center shadow-black shadow-offset-0-4 shadow-opacity-0.1 shadow-radius-12 shadow-elevation-5">
                        <Ionicons name="time" size={30} color="white" />
                        <Text className="text-4xl font-bold text-white mt-1">
                            {pendingTasks}
                        </Text>
                        <Text className="text-xl text-white/50 font-medium">
                            Pendientes
                        </Text>
                    </View>

                    <View className="bg-success flex-1 p-5 gap-2 rounded-3xl justify-center shadow-black shadow-offset-0-4 shadow-opacity-0.1 shadow-radius-12 shadow-elevation-5">
                        <Ionicons
                            name="checkmark-circle"
                            size={30}
                            color="white"
                        />
                        <Text className="text-4xl font-bold text-white mt-1">
                            {completedTasks}
                        </Text>
                        <Text className="text-xl text-white/50 font-medium">
                            Completadas
                        </Text>
                    </View>
                </View>

                <View className="bg-neutral rounded-3xl p-5 mb-8 overflow-hidden relative">
                    <View className="z-1">
                        <Text className="text-3xl font-black text-white mt-1">
                            ¡Mantén el ritmo!
                        </Text>
                        <Text className="text-xl text-white/50 font-medium">
                            Has completado el{" "}
                            {tasks.length > 0
                                ? Math.round(
                                      (completedTasks / tasks.length) * 100,
                                  )
                                : 0}
                            % de tus tareas hoy.
                        </Text>
                        <View className="mt-5">
                            <Button
                                title="Ver mis tareas"
                                onPress={() => router.push("/tasks/tasks")}
                                color="inverted"
                            />
                        </View>
                    </View>
                </View>

                <View className="mb-5">
                    <Text className="text-2xl font-black text-neutral-900 mb-5">
                        Acciones rápidas
                    </Text>
                    <View className="flex-row justify-between">
                        <Pressable
                            onPress={() => router.push("/tasks/create")}
                            className="items-center gap-2"
                        >
                            <View className="w-[70px] h-[70px] rounded-2xl justify-center items-center bg-secondary-light">
                                <Ionicons
                                    name="add"
                                    size={24}
                                    color={theme.secondary}
                                />
                            </View>
                            <Text className="text-base font-black text-neutral-900">
                                Nueva
                            </Text>
                        </Pressable>

                        <Pressable className="items-center gap-2">
                            <View className="w-[70px] h-[70px] rounded-2xl justify-center items-center bg-tertiary-light">
                                <Ionicons
                                    name="calendar"
                                    size={24}
                                    color={theme.tertiary}
                                />
                            </View>
                            <Text className="text-base font-black text-neutral-900">
                                Hoy
                            </Text>
                        </Pressable>

                        <Pressable className="items-center gap-2">
                            <View className="w-[70px] h-[70px] rounded-2xl justify-center items-center bg-neutral-light">
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color="white"
                                />
                            </View>
                            <Text className="text-base font-black text-neutral-900">
                                Ajustes
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = (theme: any) =>
    StyleSheet.create({
        actionItem: {
            alignItems: "center",
            gap: 10,
        },
        actionIcon: {
            width: 70,
            height: 70,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        actionLabel: {
            fontSize: 14,
            fontWeight: "700",
            color: theme.text,
        },
    });
