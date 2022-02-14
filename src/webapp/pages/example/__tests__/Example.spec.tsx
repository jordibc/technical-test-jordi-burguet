import "@testing-library/jest-dom/extend-expect";
import { RenderResult, waitFor } from "@testing-library/react";
import { getReactComponent, getTestContext } from "../../../../utils/tests";
import { Example } from "../Example";

const { context } = getTestContext();

function getComponent({ name = "Some Name" } = {}): RenderResult {
    return getReactComponent(<Example name={name} />, context);
}

describe("Example component", () => {
    test("renders a greeting", async () => {
        const component = getComponent();
        await waitFor(() => expect(component.queryByText("Hello Some Name!")).toBeInTheDocument());
    });
});
