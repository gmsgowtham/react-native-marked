import React, { memo, useEffect } from "react";
import { Image, ImageStyle } from "react-native";
import FitImage from "react-native-fit-image";

interface MDImageProps {
	uri: string;
	alt?: string;
	style?: ImageStyle;
}

const MDImage = ({ uri, alt, style }: MDImageProps) => {
	useEffect(() => {
		Image.prefetch(uri);
	}, [uri]);

	return (
		<FitImage
			accessibilityRole="image"
			accessibilityLabel={alt || "Image"}
			accessibilityHint={undefined}
			source={{ uri }}
			resizeMode="cover"
			style={style}
		/>
	);
};

export default memo(MDImage);
