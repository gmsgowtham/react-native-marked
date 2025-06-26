import React, { type FunctionComponent, memo, type ReactNode } from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-reanimated-table";

type MDTableProps = {
	header: ReactNode[][];
	rows: ReactNode[][][];
	widthArr: number[];
	rowStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	borderColor?: string;
	borderWidth?: number;
	tableStyle?: ViewStyle;
};

const MDTable: FunctionComponent<MDTableProps> = ({
	header,
	rows,
	widthArr,
	cellStyle,
	rowStyle,
	tableStyle,
	borderColor,
	borderWidth,
}) => {
	return (
		<ScrollView horizontal={true}>
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
