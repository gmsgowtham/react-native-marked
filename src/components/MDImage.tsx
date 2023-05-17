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
	aspectRatio: number | undefined;
};

const MDImage: FunctionComponent<MDImageProps> = ({
	uri,
	label,
	alt = "Image",
	style,
}) => {
	const [imageState, setImageState] = useState<MDImageState>({
		isLoading: true,
		aspectRatio: undefined,
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
			testID="react-native-marked-md-image"
		>
			{imageState.isLoading ? (
				<ActivityIndicator
					testID="react-native-marked-md-image-activity-indicator"
					size={"small"}
				/>
			) : null}
		</ImageBackground>
	);
};

export default memo(MDImage);
