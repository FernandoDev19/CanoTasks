import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme } from "react-native";

type Props = {
    title?: string;
    children?: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
    color?:
        | "primary"
        | "secondary"
        | "inverted"
        | "outline"
        | "danger"
        | "filter";
    circle?: boolean;
    active?: boolean;
};

export default function Button({
    title,
    children,
    onPress,
    disabled = false,
    color = "primary",
    circle = false,
    active = false,
}: Props) {
    const colorScheme = useColorScheme() ?? "light";

    const baseStyles = circle
        ? "w-20 h-20 rounded-full absolute bottom-5 right-7 items-center justify-center shadow-xl"
        : "py-3.5 px-6 rounded-2xl items-center justify-center";

    const colorStyles = {
        primary: "bg-primary active:bg-primary-light",
        secondary: "bg-secondary-light active:bg-secondary",
        inverted: "bg-neutral-light active:opacity-80",
        outline:
            "bg-transparent border border-neutral-light active:bg-neutral-light",
        danger: "bg-danger active:bg-danger-light",
        filter: `${active ? "bg-primary" : "bg-secondary-light"} active:bg-primary w-1/2`,
    };

    const textStyles = {
        primary: "text-white",
        secondary: `text-text-base-${colorScheme}`,
        inverted: "text-white",
        outline: `${active ? "text-white" : `text-text-base-${colorScheme}`} active:text-white`,
        danger: "text-white",
        filter: `${active ? "text-white" : `text-text-base-${colorScheme}`} active:text-white`,
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`${baseStyles} ${colorStyles[color]} ${disabled ? "opacity-50" : ""}`}
        >
            {({ pressed }) => {
                if (circle) {
                    return <Ionicons name="add" size={50} color="white" />;
                }

                const isWhiteText =
                    pressed ||
                    active ||
                    ["primary", "inverted", "danger"].includes(color);

                return (
                    <Text
                        className={`text-xl font-black text-center ${
                            isWhiteText
                                ? "text-white"
                                : `text-text-base-${colorScheme}`
                        }`}
                    >
                        {children || title || ""}
                    </Text>
                );
            }}
        </Pressable>
    );
}
