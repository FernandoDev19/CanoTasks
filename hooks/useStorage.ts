import { Task } from "@/types/task.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useStorage<T>(key: string, initialValue: T) {
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(key);
            if (storedData) {
                setData(JSON.parse(storedData));
            } else {
                setData(initialValue);
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [key]);

    const save = async (newValue: T) => {
        try {
            setData(newValue);
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error("Error guardando datos:", error);
        }
    };

    const remove = async (id: string) => {
        try {
            const newData = (data as Task[]).filter((item) => item.id !== id);

            setData(newData as T);
            await AsyncStorage.setItem(key, JSON.stringify(newData));
        } catch (error) {
            console.error("Error eliminando datos:", error);
        }
    };

    const toggle = async (id: string) => {
        try {
            const newData = (data as Task[]).map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task,
            );

            setData(newData as T);

            await AsyncStorage.setItem(key, JSON.stringify(newData));
        } catch (error) {
            console.error("Error toggling datos:", error);
        }
    };

    const clearCompleted = async () => {
        try {
            const newData = (data as Task[]).filter((task) => !task.isCompleted);
            setData(newData as T);
            await AsyncStorage.setItem(key, JSON.stringify(newData));
        } catch (error) {
            console.error("Error clearing completed tasks:", error);
        }
    };

    return { data, loading, save, remove, toggle, clearCompleted, refresh: loadData };
}
