import { HashRouter, Route, Switch } from "react-router-dom";
import { Example } from "../example/Example";
import { Counter } from "../counter/Counter";
import { LandingPage } from "../landing/LandingPage";

const Root = () => {
    const name = (match: { params: { name: string } }) => match.params.name ?? "Stranger";

    return (
        <HashRouter>
            <Switch>
                <Route path="/for/:name?" render={({ match }) => <Example name={name(match)} />} />
                <Route
                    path="/counter/:name?"
                    render={({ match }) => <Counter title={name(match)} name={name(match)} />}
                />

                {/* Default route */}
                <Route render={() => <LandingPage />} />
            </Switch>
        </HashRouter>
    );
};

export default Root;
