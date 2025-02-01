import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Image } from "react-native";
const MDImage = ({ uri, label, alt = "Image", style }) => {
	const [imageState, setImageState] = useState({
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
			(width, height) => {
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
	return React.createElement(
		ImageBackground,
		{
			source: { uri: uri },
			style: {
				width: "100%",
				aspectRatio: imageState.aspectRatio,
			},
			"aria-label": label,
			accessibilityRole: "image",
			accessibilityLabel: alt,
			accessibilityHint: undefined,
			imageStyle: style,
			testID: "react-native-marked-md-image",
		},
		imageState.isLoading
			? React.createElement(ActivityIndicator, {
					testID: "react-native-marked-md-image-activity-indicator",
					size: "small",
				})
			: null,
	);
};
export default memo(MDImage);
