import { SnackbarProvider } from "@eyeseetea/d2-ui-components";
import { render, RenderResult } from "@testing-library/react";
import { ReactNode } from "react";
import { getCompositionRoot } from "../CompositionRoot";
import { AppContext, AppContextState } from "../webapp/contexts/AppContext";

export function getTestContext() {
    const context = { compositionRoot: getCompositionRoot() };
    return { context };
}

export function getReactComponent(children: ReactNode, context: AppContextState): RenderResult {
    return render(
        <AppContext.Provider value={context}>
            <SnackbarProvider>{children}</SnackbarProvider>
        </AppContext.Provider>
    );
}
