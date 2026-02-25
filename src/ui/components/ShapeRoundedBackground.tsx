import { PropsWithChildren } from "react";
import { View } from "react-native";
interface IShapeRoundedBackgroundProps extends PropsWithChildren {
    size: number;
    backgroundColor: string;
    radius?: number;
    shadow?: boolean;
}
export default function ShapeRoundedBackground(props: IShapeRoundedBackgroundProps) {
    return (
        <View style={{
            width: props.size,
            height: props.size,
            borderRadius: props.radius ?? props.size / 2,
            backgroundColor: props.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            ...(props.shadow ? {
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5
            } : {}),
        }} >
            {props.children}
        </View>
    )
}

