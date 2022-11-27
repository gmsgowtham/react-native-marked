import path from "path";
import { dangerReassure } from "reassure";

dangerReassure({
	inputFilePath: path.join(__dirname, ".reassure/output.md"),
});
