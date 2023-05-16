import React, {
	type FunctionComponent,
	memo,
	useEffect,
	useState,
} from "react";
import {
	ActivityIndicator,
	ImageBackground,
	Image,
	type ImageStyle,
} from "react-native";

type MDImageProps = {
	uri: string;
	label?: string;
	alt?: string;
	style?: ImageStyle;
};

type MDImageState = {
	isLoading: boolean;
	aspectRatio: number;
};

const MDImage: FunctionComponent<MDImageProps> = ({
	uri,
	label,
	alt = "Image",
	style,
}) => {
	const [imageState, setImageState] = useState<MDImageState>({
		isLoading: true,
		aspectRatio: 0,
	});

	useEffect(() => {
		fetchOriginalSizeFromRemoteImage();
	}, []);

	/**
	 * Fetches image dimension
	 * Sets aspect ratio if resolved
	 */
	const fetchOriginalSizeFromRemoteImage = () => {
		Image.getSize(
			uri,
			(width: number, height: number) => {
				setImageState({ isLoading: false, aspectRatio: width / height });
			},
			() => {
				setImageState((current) => {
					return {
						...current,
						isLoading: false,
					};
				});
			},
		);
	};

	return (
		<ImageBackground
			source={{ uri: uri }}
			style={{ width: "100%", aspectRatio: imageState.aspectRatio }}
			aria-label={label}
			accessibilityRole="image"
			accessibilityLabel={alt}
			accessibilityHint={undefined}
			imageStyle={style}
		>
			{imageState.isLoading ? <ActivityIndicator size={"small"} /> : null}
		</ImageBackground>
	);
};

export default memo(MDImage);
