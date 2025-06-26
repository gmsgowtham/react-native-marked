import React, {
	type FunctionComponent,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
import { ActivityIndicator, type LayoutChangeEvent, View } from "react-native";
import { SvgFromXml } from "react-native-svg";
import { getSvgDimensions } from "./../utils/svg";

type MDSvgProps = {
	uri: string;
	alt?: string;
};

type MdSvgState = {
	viewBox: string;
	width: number;
	height: number;
	svg: string;
	isLoading: boolean;
	error: boolean;
	aspectRatio?: number;
};

const MDSvg: FunctionComponent<MDSvgProps> = ({ uri, alt = "image" }) => {
	const isFirstLoad = useRef<boolean>(false);
	const [layoutWidth, setLayoutWidth] = useState<number>(0);
	const [svgState, setSvgState] = useState<MdSvgState>({
		viewBox: "",
		width: 0,
		height: 0,
		svg: "",
		isLoading: true,
		error: false,
		aspectRatio: undefined,
	});
	useEffect(() => {
		const fetchSvg = async () => {
			try {
				const res = await fetch(uri);
				const text = await res.text();
				if (res.status !== 200) {
					throw new Error("Status is not 200");
				}
				const { viewBox, width, height } = getSvgDimensions(text);

				setSvgState({
					width,
					height,
					viewBox,
					svg: text,
					isLoading: false,
					error: false,
					aspectRatio: width / height,
				});
			} catch (_e) {
				setSvgState((state) => ({
					...state,
					error: true,
					isLoading: false,
				}));
			}
		};

		fetchSvg();
	}, [uri]);

	const onLayout = (event: LayoutChangeEvent) => {
		if (!isFirstLoad.current) {
			setLayoutWidth(event.nativeEvent.layout.width ?? 0);
			isFirstLoad.current = true;
		}
	};

	const getWidth = () => {
		if (layoutWidth && svgState.width) {
			return Math.min(layoutWidth, svgState.width);
		}
		return "100%";
	};

	return (
		<View
			style={{ width: getWidth(), aspectRatio: svgState.aspectRatio }}
			onLayout={onLayout}
		>
			{svgState.isLoading ? (
				<ActivityIndicator size={"small"} />
			) : (
				<SvgFromXml
					xml={svgState.svg}
					width={"100%"}
					height={"100%"}
					viewBox={svgState.viewBox}
					aria-label={alt}
					accessibilityRole="image"
					accessibilityLabel={alt}
					accessibilityHint={undefined}
					testID="react-native-marked-md-svg"
				/>
			)}
		</View>
	);
};

export default memo(MDSvg);
