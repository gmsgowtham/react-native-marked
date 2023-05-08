import React, { memo, useEffect, useState } from "react";
import {
	Image,
	ActivityIndicator,
	type ImageStyle,
	ImageBackground,
} from "react-native";

interface MDImageProps {
	uri: string;
	alt?: string;
	style?: ImageStyle;
}

const MDImage = ({ uri, alt, style }: MDImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [aspectRatio, setAspectRatio] = useState<number>(0);

	useEffect(() => {
		Image.prefetch(uri);
		fetchOriginalSizeFromRemoteImage();
	}, []);

	const onLoadEndOrOnError = () => {
		if (isLoading) {
			setIsLoading(false);
		}
	};

	const fetchOriginalSizeFromRemoteImage = () => {
		Image.getSize(uri, (width: number, height: number) => {
			setAspectRatio(width / height);
		});
	};

	return (
		<ImageBackground
			onLoadEnd={onLoadEndOrOnError}
			onError={onLoadEndOrOnError}
			source={{ uri: uri }}
			style={[style, { width: "100%", aspectRatio }]}
			resizeMode={"contain"}
			accessibilityRole="image"
			accessibilityLabel={alt || "Image"}
			accessibilityHint={undefined}
		>
			{isLoading ? <ActivityIndicator size={"small"} /> : null}
		</ImageBackground>
	);
};

export default memo(MDImage);
