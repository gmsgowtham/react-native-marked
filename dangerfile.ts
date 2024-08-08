import path from "node:path";
import { dangerReassure } from "reassure";

dangerReassure({
	inputFilePath: path.join(__dirname, ".reassure/output.md"),
});
