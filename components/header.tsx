import "@/global.css";
import { useRouter } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function header() {
    const colorScheme = useColorScheme() ?? "light";
    const router = useRouter();

    const handlePress = () => {
        router.push("/");
    };

    return (
        <SafeAreaView className={`bg-white shadow-md`}>
            <View className="py-4 px-5 flex-row justify-between items-center">
                <Pressable onPress={handlePress}>
                    <Text className={`text-3xl font-black text-primary`}>
                        CanoTasks
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
