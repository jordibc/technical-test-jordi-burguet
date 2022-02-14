import { CustomDataProvider } from "@dhis2/app-runtime";
import { HeaderBar } from "@dhis2/ui";
import { SnackbarProvider } from "@eyeseetea/d2-ui-components";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { getCompositionRoot } from "../../../CompositionRoot";
import { AppContext, AppContextState } from "../../contexts/AppContext";
import Root from "../../pages/router/Router";
import "./App.css";
import { muiTheme } from "./themes/dhis2.theme";

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [appContext, setAppContext] = useState<AppContextState | null>(null);

    useEffect(() => {
        async function setup() {
            const compositionRoot = getCompositionRoot();

            setAppContext({ compositionRoot });
            setLoading(false);
        }
        setup();
    }, []);

    if (loading) return null;

    return (
        <MuiThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <CustomDataProvider data={fakeData}>
                    <HeaderBar appName="Technical test" />
                </CustomDataProvider>

                <div id="app" className="content">
                    <AppContext.Provider value={appContext}>
                        <Root />
                    </AppContext.Provider>
                </div>
            </SnackbarProvider>
        </MuiThemeProvider>
    );
};

const fakeData = {
    "action::menu/getModules": {
        modules: [],
    },
    me: {
        authorities: ["ALL"],
        email: "john_doe@dhis2.org",
        name: "John Doe",
        settings: {
            keyUiLocale: "en",
        },
    },
    "me/dashboard": {
        unreadInterpretations: 0,
        unreadMessageConversations: 0,
    },
    "systemSettings/applicationTitle": {
        applicationTitle: "EyeSeeTea",
    },
    "systemSettings/helpPageLink": {
        helpPageLink: "",
    },
};

export default React.memo(App);
