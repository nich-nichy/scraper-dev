import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { ReadPropertyFromJsonElementTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonElementExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonElementTask>): Promise<boolean> {
    try {
        const jsonData = environment.getInput("JSON");
        if (!jsonData) {
            environment.log.error("input -> Json not defined");
        }

        const propertyName = environment.getInput("Property name");
        if (!propertyName) {
            environment.log.error("input -> propertyName not defined");
        }
        const json = JSON.parse(jsonData);
        const propertyValue = json[propertyName];
        if (propertyValue === undefined) {
            environment.log.error("Property not found");
            return false;
        }
        environment.setOutput("Property value", propertyValue);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}