import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "@/global.css";
import { useStorage } from "@/hooks/useStorage";
import { Task } from "@/types/task.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, useColorScheme, View } from "react-native";
import * as z from "zod";

const schema = z.object({
    title: z
        .string()
        .min(1, "El título es obligatorio")
        .min(3, "Mínimo 3 caracteres"),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    startDate: z.date(),
    endDate: z.date(),
});

type FormData = z.infer<typeof schema>;

export default function CreateTask() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const { data: tasks, save } = useStorage<Task[]>("tasks", []);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            priority: "low",
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000),
        },
    });

    const onSubmit = (data: FormData) => {
        const newTask: Task = {
            ...data,
            id: Date.now().toString(),
            description: data.description || "",
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        save([...tasks, newTask]);
        reset();
        router.replace("./tasks");
    };

    return (
        <ScrollView
            className={`flex-1 bg-white px-7 pt-7`}
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            <View className="gap-1.5 mb-8">
                <Text
                    className={`text-4xl font-black text-text-base-${colorScheme}`}
                >
                    Nueva Tarea
                </Text>
                <Text className="text-xl font-medium text-neutral-medium">
                    ¿Qué tienes pendiente hoy?
                </Text>
            </View>

            <View className="gap-5">
                <View className="gap-2">
                    <Text
                        className={`text-xl font-bold text-text-base-${colorScheme}`}
                    >
                        Título
                    </Text>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Escribe el título..."
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.title && (
                        <Text className="text-danger text-sm font-semibold -mt-1">
                            {errors.title.message}
                        </Text>
                    )}
                </View>

                <View className="gap-2">
                    <Text
                        className={`text-xl font-bold text-text-base-${colorScheme}`}
                    >
                        Descripción
                    </Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Añade una descripción..."
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.description && (
                        <Text className="text-danger text-sm font-semibold -mt-1">
                            {errors.description.message}
                        </Text>
                    )}
                </View>

                <View className="gap-2">
                    <Text
                        className={`text-xl font-bold text-text-base-${colorScheme}`}
                    >
                        Prioridad
                    </Text>
                    <Controller
                        control={control}
                        name="priority"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                type="select"
                                placeholder="Prioridad"
                                options={["low", "medium", "high"]}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.priority && (
                        <Text className="text-danger text-sm font-semibold -mt-1">
                            {errors.priority.message}
                        </Text>
                    )}
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1 gap-2">
                        <Text
                            className={`text-xl font-bold text-text-base-${colorScheme}`}
                        >
                            Inicio
                        </Text>
                        <Controller
                            control={control}
                            name="startDate"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    type="date"
                                    placeholder="Hoy"
                                    value={value}
                                    onChangeDate={onChange}
                                />
                            )}
                        />
                    </View>
                    <View className="flex-1 gap-2">
                        <Text
                            className={`text-xl font-bold text-text-base-${colorScheme}`}
                        >
                            Final
                        </Text>
                        <Controller
                            control={control}
                            name="endDate"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    type="date"
                                    placeholder="Mañana"
                                    value={value}
                                    onChangeDate={onChange}
                                />
                            )}
                        />
                    </View>
                </View>

                <View className="mt-8">
                    <Button
                        title="Guardar Tarea"
                        onPress={handleSubmit(onSubmit)}
                        color="primary"
                    />
                </View>
            </View>
        </ScrollView>
    );
}
