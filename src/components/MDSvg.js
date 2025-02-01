import React, { memo, useEffect, useState, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { SvgFromXml } from "react-native-svg";
import { getSvgDimensions } from "./../utils/svg";
const MDSvg = ({ uri, alt = "image" }) => {
	const isFirstLoad = useRef(false);
	const [layoutWidth, setLayoutWidth] = useState(0);
	const [svgState, setSvgState] = useState({
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
			} catch (e) {
				setSvgState((state) => ({
					...state,
					error: true,
					isLoading: false,
				}));
			}
		};
		fetchSvg();
	}, [uri]);
	const onLayout = (event) => {
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
	return React.createElement(
		View,
		{
			style: { width: getWidth(), aspectRatio: svgState.aspectRatio },
			onLayout: onLayout,
		},
		svgState.isLoading
			? React.createElement(ActivityIndicator, { size: "small" })
			: React.createElement(SvgFromXml, {
					xml: svgState.svg,
					width: "100%",
					height: "100%",
					viewBox: svgState.viewBox,
					"aria-label": alt,
					accessibilityRole: "image",
					accessibilityLabel: alt,
					accessibilityHint: undefined,
					testID: "react-native-marked-md-svg",
				}),
	);
};
export default memo(MDSvg);
