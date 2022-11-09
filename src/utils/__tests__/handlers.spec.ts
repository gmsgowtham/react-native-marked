import { Linking } from "react-native";
import { onLinkPress } from "../handlers";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(() => Promise.resolve("mockResolve")),
}));

describe("onLinkPress", () => {
	it("Good url", async () => {
		const cb = onLinkPress("https://example.com");
		cb.call(null);
		expect(Linking.openURL).toHaveBeenCalled();
	});

	it("Bad url", async () => {
		Linking.openURL = jest.fn(() => Promise.reject("mockReject"));
		const cb = onLinkPress("example");
		cb.call(null);
		expect(Linking.openURL).toHaveBeenCalled();
	});
});
