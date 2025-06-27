import Decimal from "@jsamr/counter-style/presets/decimal";
import Disc from "@jsamr/counter-style/presets/disc";
import { MarkedListItem, useMarkedList } from "@jsamr/react-native-li";
import React, {
	Fragment,
	type FunctionComponent,
	memo,
	type ReactNode,
} from "react";
import type { TextStyle, ViewStyle } from "react-native";

type MDListProps = {
	ordered: boolean;
	li: ReactNode[];
	listStyle?: ViewStyle;
	textStyle?: TextStyle;
	startIndex?: number;
};

const MDList: FunctionComponent<MDListProps> = ({
	ordered,
	li,
	listStyle,
	textStyle,
	startIndex,
}) => {
	const listProps = useMarkedList({
		counterRenderer: ordered ? Decimal : Disc,
		startIndex: startIndex,
		markerTextStyle: textStyle,
		markerBoxStyle: listStyle,
		length: li.length,
	});

	return (
		<Fragment>
			{li.map((node, index) => (
				<MarkedListItem key={index} index={index} {...listProps}>
					{node}
				</MarkedListItem>
			))}
		</Fragment>
	);
};

export default memo(MDList);
