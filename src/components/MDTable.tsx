import React, {
	type FunctionComponent,
	memo,
	type ReactNode,
	useState,
} from "react";
import { Dimensions, ScrollView, View, type ViewStyle } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";
import { getTableWidthArr } from "../utils/table";

type MDTableProps = {
	header: ReactNode[][];
	rows: ReactNode[][][];
	rowStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	borderColor?: string;
	borderWidth?: number;
	tableStyle?: ViewStyle;
};

const MDTable: FunctionComponent<MDTableProps> = ({
	header,
	rows,
	cellStyle,
	rowStyle,
	tableStyle,
	borderColor,
	borderWidth,
}) => {
	// The window width is only a first guess until the table's own width is laid out.
	const [width, setWidth] = useState(() => Dimensions.get("window").width);
	const widthArr = getTableWidthArr(header.length, width);
	return (
		<ScrollView
			horizontal={true}
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
		>
			<Table borderStyle={{ borderColor, borderWidth }} style={tableStyle}>
				<TableWrapper style={rowStyle}>
					{header.map((headerCol, index) => {
						return (
							<Cell
								width={widthArr[index]}
								key={`${index}`}
								data={<View style={cellStyle}>{headerCol}</View>}
							/>
						);
					})}
				</TableWrapper>
				{rows.map((rowData, index) => {
					return (
						<TableWrapper key={`${index}`} style={rowStyle}>
							{rowData.map((cellData, cellIndex) => {
								return (
									<Cell
										width={widthArr[cellIndex]}
										key={`${cellIndex}`}
										data={<View style={cellStyle}>{cellData}</View>}
									/>
								);
							})}
						</TableWrapper>
					);
				})}
			</Table>
		</ScrollView>
	);
};

export default memo(MDTable);
