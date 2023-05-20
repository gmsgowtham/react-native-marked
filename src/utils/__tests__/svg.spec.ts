import { getSvgDimensions } from "../svg";

describe("getSvgDimensions", () => {
	it("svg with width, height, viewBox attribute", () => {
		expect(getSvgDimensions(SVG_WITH_WIDTH_HEIGHT)).toStrictEqual({
			width: 800,
			height: 800,
			viewBox: "0 0 64 64",
		});
	});
	it("svg without width, height", () => {
		expect(getSvgDimensions(SVG_WITHOUT_WIDTH_HEIGHT)).toStrictEqual({
			width: 0,
			height: 0,
			viewBox: "0 0 64 64",
		});
	});
	it("svg without width, height, viewBox", () => {
		expect(getSvgDimensions(SVG_WITHOUT_WIDTH_HEIGHT_VIEW_BOX)).toStrictEqual({
			width: 0,
			height: 0,
			viewBox: "",
		});
	});
});

const SVG_WITH_WIDTH_HEIGHT = `
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<g>
		<path fill="#F76D57" d="M2,15.998v30c0,1.104,0.896,2,2,2h12v-4H7c-0.553,0-1-0.447-1-1v-24c0-0.553,0.447-1,1-1h9v-4H4
			C2.896,13.998,2,14.893,2,15.998z"/>
		<path fill="#F76D57" d="M18,60c0,1.105,0.896,2,2,2h36c1.104,0,2-0.895,2-2v-4H18V60z"/>
		<path fill="#F76D57" d="M56,15.998c-1.588,0-3.063-0.469-4.309-1.268c-1.099,1.381-2.79,2.268-4.691,2.268
			c-1.326,0-2.548-0.436-3.541-1.164c-1.43,1.338-3.346,2.164-5.459,2.164c-2.191,0-4.175-0.883-5.62-2.311
			c-1.259,0.826-2.762,1.311-4.38,1.311c-2.748,0-5.171-1.387-6.611-3.498c-0.732,0.318-1.539,0.498-2.389,0.498
			c-0.342,0-0.674-0.035-1-0.09V54h40V15.998l0.354-0.354C57.609,15.875,56.819,15.998,56,15.998z"/>
	</g>
	<path fill="#F9EBB2" d="M56,13.998c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715
		c-0.055,0.82-0.352,1.564-0.825,2.174c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703
		c-0.594-0.408-1.065-0.975-1.369-1.635c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596
		c-1.583,0-3.02-0.619-4.092-1.619c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348
		c-0.915,0.564-1.989,0.896-3.143,0.896c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994
		c-0.437,0.572-1.015,1.027-1.693,1.299c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4
		c0.839,0,1.616,0.26,2.26,0.703c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746
		C25.006,3.605,26.431,2.998,28,2.998c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623
		c0.429-0.531,0.948-0.986,1.532-1.348C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145
		c0.675,0.148,1.305,0.412,1.873,0.768c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18
		c1.729,0,3.188,1.104,3.747,2.641c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693
		c0.143-0.406,0.326-0.791,0.548-1.15c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"
		/>
	<g>
		<path fill="#394240" d="M38,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C39,20.445,38.553,19.998,38,19.998z"/>
		<path fill="#394240" d="M48,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C49,20.445,48.553,19.998,48,19.998z"/>
		<path fill="#394240" d="M28,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C29,20.445,28.553,19.998,28,19.998z"/>
		<path fill="#394240" d="M56-0.002c-2.386,0-4.521,1.051-5.987,2.707C48.939,1.074,47.097-0.002,45-0.002
			c-1.93,0-3.642,0.914-4.739,2.33c-0.717-0.213-1.475-0.33-2.261-0.33c-1.618,0-3.121,0.484-4.38,1.311
			C32.175,1.881,30.191,0.998,28,0.998c-2.113,0-4.029,0.826-5.459,2.164C21.548,2.434,20.326,1.998,19,1.998c-3.313,0-6,2.686-6,6
			c0,1.539,0.584,2.938,1.537,4H4c-2.211,0-4,1.789-4,4v30c0,2.211,1.789,4,4,4h12V60c0,2.211,1.789,4,4,4h36c2.211,0,4-1.789,4-4
			V14.92c2.389-1.385,4-3.963,4-6.922C64,3.58,60.418-0.002,56-0.002z M16,41.998H8v-22h8V41.998z M16,17.998H7
			c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30c0-1.105,0.896-2,2-2h12V17.998z M58,60
			c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z M58,15.998V54H18V13.908c0.326,0.055,0.658,0.09,1,0.09
			c0.85,0,1.656-0.18,2.389-0.498c1.44,2.111,3.863,3.498,6.611,3.498c1.618,0,3.121-0.484,4.38-1.311
			c1.445,1.428,3.429,2.311,5.62,2.311c2.113,0,4.029-0.826,5.459-2.164c0.993,0.729,2.215,1.164,3.541,1.164
			c1.901,0,3.593-0.887,4.691-2.268c1.245,0.799,2.721,1.268,4.309,1.268c0.819,0,1.609-0.123,2.354-0.354L58,15.998z M56,13.998
			c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715c-0.055,0.82-0.352,1.564-0.825,2.174
			c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703c-0.594-0.408-1.065-0.975-1.369-1.635
			c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596c-1.583,0-3.02-0.619-4.092-1.619
			c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348c-0.915,0.564-1.989,0.896-3.143,0.896
			c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994c-0.437,0.572-1.015,1.027-1.693,1.299
			c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4c0.839,0,1.616,0.26,2.26,0.703
			c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746C25.006,3.605,26.431,2.998,28,2.998
			c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623c0.429-0.531,0.948-0.986,1.532-1.348
			C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145c0.675,0.148,1.305,0.412,1.873,0.768
			c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18c1.729,0,3.188,1.104,3.747,2.641
			c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693c0.143-0.406,0.326-0.791,0.548-1.15
			c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"/>
	</g>
	<path opacity="0.2" d="M16,17.998H7c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30
		c0-1.105,0.896-2,2-2h12V17.998z"/>
	<path opacity="0.2" d="M58,60c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z"/>
</g>
</svg>
`;

const SVG_WITHOUT_WIDTH_HEIGHT = `
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<g>
		<path fill="#F76D57" d="M2,15.998v30c0,1.104,0.896,2,2,2h12v-4H7c-0.553,0-1-0.447-1-1v-24c0-0.553,0.447-1,1-1h9v-4H4
			C2.896,13.998,2,14.893,2,15.998z"/>
		<path fill="#F76D57" d="M18,60c0,1.105,0.896,2,2,2h36c1.104,0,2-0.895,2-2v-4H18V60z"/>
		<path fill="#F76D57" d="M56,15.998c-1.588,0-3.063-0.469-4.309-1.268c-1.099,1.381-2.79,2.268-4.691,2.268
			c-1.326,0-2.548-0.436-3.541-1.164c-1.43,1.338-3.346,2.164-5.459,2.164c-2.191,0-4.175-0.883-5.62-2.311
			c-1.259,0.826-2.762,1.311-4.38,1.311c-2.748,0-5.171-1.387-6.611-3.498c-0.732,0.318-1.539,0.498-2.389,0.498
			c-0.342,0-0.674-0.035-1-0.09V54h40V15.998l0.354-0.354C57.609,15.875,56.819,15.998,56,15.998z"/>
	</g>
	<path fill="#F9EBB2" d="M56,13.998c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715
		c-0.055,0.82-0.352,1.564-0.825,2.174c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703
		c-0.594-0.408-1.065-0.975-1.369-1.635c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596
		c-1.583,0-3.02-0.619-4.092-1.619c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348
		c-0.915,0.564-1.989,0.896-3.143,0.896c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994
		c-0.437,0.572-1.015,1.027-1.693,1.299c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4
		c0.839,0,1.616,0.26,2.26,0.703c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746
		C25.006,3.605,26.431,2.998,28,2.998c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623
		c0.429-0.531,0.948-0.986,1.532-1.348C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145
		c0.675,0.148,1.305,0.412,1.873,0.768c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18
		c1.729,0,3.188,1.104,3.747,2.641c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693
		c0.143-0.406,0.326-0.791,0.548-1.15c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"
		/>
	<g>
		<path fill="#394240" d="M38,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C39,20.445,38.553,19.998,38,19.998z"/>
		<path fill="#394240" d="M48,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C49,20.445,48.553,19.998,48,19.998z"/>
		<path fill="#394240" d="M28,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C29,20.445,28.553,19.998,28,19.998z"/>
		<path fill="#394240" d="M56-0.002c-2.386,0-4.521,1.051-5.987,2.707C48.939,1.074,47.097-0.002,45-0.002
			c-1.93,0-3.642,0.914-4.739,2.33c-0.717-0.213-1.475-0.33-2.261-0.33c-1.618,0-3.121,0.484-4.38,1.311
			C32.175,1.881,30.191,0.998,28,0.998c-2.113,0-4.029,0.826-5.459,2.164C21.548,2.434,20.326,1.998,19,1.998c-3.313,0-6,2.686-6,6
			c0,1.539,0.584,2.938,1.537,4H4c-2.211,0-4,1.789-4,4v30c0,2.211,1.789,4,4,4h12V60c0,2.211,1.789,4,4,4h36c2.211,0,4-1.789,4-4
			V14.92c2.389-1.385,4-3.963,4-6.922C64,3.58,60.418-0.002,56-0.002z M16,41.998H8v-22h8V41.998z M16,17.998H7
			c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30c0-1.105,0.896-2,2-2h12V17.998z M58,60
			c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z M58,15.998V54H18V13.908c0.326,0.055,0.658,0.09,1,0.09
			c0.85,0,1.656-0.18,2.389-0.498c1.44,2.111,3.863,3.498,6.611,3.498c1.618,0,3.121-0.484,4.38-1.311
			c1.445,1.428,3.429,2.311,5.62,2.311c2.113,0,4.029-0.826,5.459-2.164c0.993,0.729,2.215,1.164,3.541,1.164
			c1.901,0,3.593-0.887,4.691-2.268c1.245,0.799,2.721,1.268,4.309,1.268c0.819,0,1.609-0.123,2.354-0.354L58,15.998z M56,13.998
			c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715c-0.055,0.82-0.352,1.564-0.825,2.174
			c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703c-0.594-0.408-1.065-0.975-1.369-1.635
			c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596c-1.583,0-3.02-0.619-4.092-1.619
			c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348c-0.915,0.564-1.989,0.896-3.143,0.896
			c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994c-0.437,0.572-1.015,1.027-1.693,1.299
			c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4c0.839,0,1.616,0.26,2.26,0.703
			c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746C25.006,3.605,26.431,2.998,28,2.998
			c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623c0.429-0.531,0.948-0.986,1.532-1.348
			C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145c0.675,0.148,1.305,0.412,1.873,0.768
			c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18c1.729,0,3.188,1.104,3.747,2.641
			c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693c0.143-0.406,0.326-0.791,0.548-1.15
			c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"/>
	</g>
	<path opacity="0.2" d="M16,17.998H7c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30
		c0-1.105,0.896-2,2-2h12V17.998z"/>
	<path opacity="0.2" d="M58,60c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z"/>
</g>
</svg>
`;

const SVG_WITHOUT_WIDTH_HEIGHT_VIEW_BOX = `
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<g>
		<path fill="#F76D57" d="M2,15.998v30c0,1.104,0.896,2,2,2h12v-4H7c-0.553,0-1-0.447-1-1v-24c0-0.553,0.447-1,1-1h9v-4H4
			C2.896,13.998,2,14.893,2,15.998z"/>
		<path fill="#F76D57" d="M18,60c0,1.105,0.896,2,2,2h36c1.104,0,2-0.895,2-2v-4H18V60z"/>
		<path fill="#F76D57" d="M56,15.998c-1.588,0-3.063-0.469-4.309-1.268c-1.099,1.381-2.79,2.268-4.691,2.268
			c-1.326,0-2.548-0.436-3.541-1.164c-1.43,1.338-3.346,2.164-5.459,2.164c-2.191,0-4.175-0.883-5.62-2.311
			c-1.259,0.826-2.762,1.311-4.38,1.311c-2.748,0-5.171-1.387-6.611-3.498c-0.732,0.318-1.539,0.498-2.389,0.498
			c-0.342,0-0.674-0.035-1-0.09V54h40V15.998l0.354-0.354C57.609,15.875,56.819,15.998,56,15.998z"/>
	</g>
	<path fill="#F9EBB2" d="M56,13.998c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715
		c-0.055,0.82-0.352,1.564-0.825,2.174c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703
		c-0.594-0.408-1.065-0.975-1.369-1.635c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596
		c-1.583,0-3.02-0.619-4.092-1.619c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348
		c-0.915,0.564-1.989,0.896-3.143,0.896c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994
		c-0.437,0.572-1.015,1.027-1.693,1.299c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4
		c0.839,0,1.616,0.26,2.26,0.703c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746
		C25.006,3.605,26.431,2.998,28,2.998c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623
		c0.429-0.531,0.948-0.986,1.532-1.348C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145
		c0.675,0.148,1.305,0.412,1.873,0.768c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18
		c1.729,0,3.188,1.104,3.747,2.641c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693
		c0.143-0.406,0.326-0.791,0.548-1.15c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"
		/>
	<g>
		<path fill="#394240" d="M38,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C39,20.445,38.553,19.998,38,19.998z"/>
		<path fill="#394240" d="M48,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C49,20.445,48.553,19.998,48,19.998z"/>
		<path fill="#394240" d="M28,19.998c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1v-26
			C29,20.445,28.553,19.998,28,19.998z"/>
		<path fill="#394240" d="M56-0.002c-2.386,0-4.521,1.051-5.987,2.707C48.939,1.074,47.097-0.002,45-0.002
			c-1.93,0-3.642,0.914-4.739,2.33c-0.717-0.213-1.475-0.33-2.261-0.33c-1.618,0-3.121,0.484-4.38,1.311
			C32.175,1.881,30.191,0.998,28,0.998c-2.113,0-4.029,0.826-5.459,2.164C21.548,2.434,20.326,1.998,19,1.998c-3.313,0-6,2.686-6,6
			c0,1.539,0.584,2.938,1.537,4H4c-2.211,0-4,1.789-4,4v30c0,2.211,1.789,4,4,4h12V60c0,2.211,1.789,4,4,4h36c2.211,0,4-1.789,4-4
			V14.92c2.389-1.385,4-3.963,4-6.922C64,3.58,60.418-0.002,56-0.002z M16,41.998H8v-22h8V41.998z M16,17.998H7
			c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30c0-1.105,0.896-2,2-2h12V17.998z M58,60
			c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z M58,15.998V54H18V13.908c0.326,0.055,0.658,0.09,1,0.09
			c0.85,0,1.656-0.18,2.389-0.498c1.44,2.111,3.863,3.498,6.611,3.498c1.618,0,3.121-0.484,4.38-1.311
			c1.445,1.428,3.429,2.311,5.62,2.311c2.113,0,4.029-0.826,5.459-2.164c0.993,0.729,2.215,1.164,3.541,1.164
			c1.901,0,3.593-0.887,4.691-2.268c1.245,0.799,2.721,1.268,4.309,1.268c0.819,0,1.609-0.123,2.354-0.354L58,15.998z M56,13.998
			c-1.237,0-2.387-0.375-3.343-1.018c-0.671-0.451-1.242-1.037-1.685-1.715c-0.055,0.82-0.352,1.564-0.825,2.174
			c-0.731,0.941-1.862,1.559-3.147,1.559c-0.839,0-1.616-0.262-2.26-0.703c-0.594-0.408-1.065-0.975-1.369-1.635
			c-0.328,0.658-0.772,1.248-1.309,1.742c-1.069,0.988-2.493,1.596-4.062,1.596c-1.583,0-3.02-0.619-4.092-1.619
			c-0.498-0.467-0.917-1.014-1.233-1.625c-0.429,0.533-0.948,0.986-1.532,1.348c-0.915,0.564-1.989,0.896-3.143,0.896
			c-2.048,0-3.854-1.029-4.937-2.596c-0.412-0.596-0.715-1.27-0.89-1.994c-0.437,0.572-1.015,1.027-1.693,1.299
			c-0.459,0.184-0.956,0.291-1.48,0.291c-2.209,0-4-1.791-4-4s1.791-4,4-4c0.839,0,1.616,0.26,2.26,0.703
			c0.594,0.406,1.065,0.975,1.369,1.637c0.327-0.662,0.771-1.25,1.308-1.746C25.006,3.605,26.431,2.998,28,2.998
			c1.583,0,3.02,0.617,4.092,1.619c0.498,0.467,0.917,1.014,1.233,1.623c0.429-0.531,0.948-0.986,1.532-1.348
			C35.772,4.328,36.846,3.998,38,3.998c0.445,0,0.878,0.053,1.296,0.145c0.675,0.148,1.305,0.412,1.873,0.768
			c0.188-0.66,0.524-1.26,0.996-1.732c0.725-0.729,1.727-1.18,2.835-1.18c1.729,0,3.188,1.104,3.747,2.641
			c0.08,0.221,0.145,0.449,0.185,0.684c0.503,0.17,0.978,0.402,1.41,0.693c0.143-0.406,0.326-0.791,0.548-1.15
			c1.056-1.719,2.946-2.867,5.11-2.867c3.313,0,6,2.686,6,6C62,11.311,59.313,13.998,56,13.998z"/>
	</g>
	<path opacity="0.2" d="M16,17.998H7c-0.553,0-1,0.447-1,1v24c0,0.553,0.447,1,1,1h9v4H4c-1.104,0-2-0.896-2-2v-30
		c0-1.105,0.896-2,2-2h12V17.998z"/>
	<path opacity="0.2" d="M58,60c0,1.105-0.896,2-2,2H20c-1.104,0-2-0.895-2-2v-4h40V60z"/>
</g>
</svg>
`;
