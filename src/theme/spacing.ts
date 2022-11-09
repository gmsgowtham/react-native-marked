export type SpacingKeysType = "xs" | "s" | "m" | "l";

const padding: Record<SpacingKeysType, number> = {
	xs: 2,
	s: 4,
	m: 8,
	l: 16,
};

export default padding;
