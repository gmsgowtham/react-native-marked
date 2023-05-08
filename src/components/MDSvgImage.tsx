import React, {
	memo,
	type FunctionComponent,
	useEffect,
	useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { SvgWithCss, SvgCssUri } from "react-native-svg";
import { getSvgWidthAndHeightFromString } from "../utils/image";

interface MDSvgImageProps {
	uri: string;
	alt?: string;
}

interface SvgState {
	isLoading: boolean;
	svg: string;
	width: number | string;
	height: number | string;
	hasError: boolean;
}

const MDSvgImage: FunctionComponent<MDSvgImageProps> = ({ uri, alt }) => {
	const [svgState, setSvgState] = useState<SvgState>({
		isLoading: true,
		svg: "",
		width: "100%",
		height: 100,
		hasError: false,
	});

	useEffect(() => {
		const fetchImage = async (uri: string) => {
			try {
				const response = await fetch(uri);
				const text = await response.text();
				const { width, height } = getSvgWidthAndHeightFromString(text);
				setSvgState((prevState) => {
					return {
						...prevState,
						isLoading: false,
						svg: text,
						width: width || prevState.width,
						height: height || prevState.height,
					};
				});
			} catch (e) {
				setSvgState((prevState: SvgState): SvgState => {
					return {
						...prevState,
						isLoading: false,
						hasError: true,
					};
				});
			}
		};

		fetchImage(uri);
	}, []);

	if (svgState.isLoading) {
		return <ActivityIndicator />;
	}

	if (svgState.hasError) {
		return (
			<SvgCssUri
				uri={uri}
				width={svgState.width}
				height={svgState.height}
				accessibilityRole="image"
				accessibilityLabel={alt || "Image"}
				accessibilityHint={undefined}
			/>
		);
	}

	return (
		<SvgWithCss
			xml={svgState.svg}
			width={"100%"}
			height={svgState.height}
			// style={{ aspectRatio: Number(svgState.width) / Number(svgState.height) }}
		/>
	);
};

export default memo(MDSvgImage);
