import ReactDOM from "react-dom";
import App from "./webapp/components/app/App";

async function main() {
    try {
        ReactDOM.render(<App />, document.getElementById("root"));
    } catch (err: any) {
        console.error(err);
        const message = err.toString();
        ReactDOM.render(<div>{message}</div>, document.getElementById("root"));
    }
}

main();
