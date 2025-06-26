import React, {
	type FunctionComponent,
	memo,
	useEffect,
	useState,
} from "react";
import {
	ActivityIndicator,
	Image,
	ImageBackground,
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

	/**
	 * Fetches image dimension
	 * Sets aspect ratio if resolved
	 */
	const fetchOriginalSizeFromRemoteImage = () => {
		Image.getSize(
			uri,
			(width: number, height: number) => {
				if (width > 0 && height > 0) {
					setImageState({ isLoading: false, aspectRatio: width / height });
				} else {
					setImageState({ isLoading: false, aspectRatio: undefined });
				}
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

	useEffect(() => {
		fetchOriginalSizeFromRemoteImage();
	});

	return (
		<ImageBackground
			source={{ uri: uri }}
			style={{
				width: "100%",
				aspectRatio: imageState.aspectRatio,
			}}
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
