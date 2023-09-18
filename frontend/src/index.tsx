import { h, render } from "preact";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import User from "./User";
import { Route, Router } from "preact-router";
import { Form } from "./Form";
interface UserProps {
  path: string;
  // Other props your component accepts
}

export function App(props: UserProps) {
  return (
    <Router>
      <Route path="/" component={User} />
      <Route path="/form" component={Form} />
    </Router>
  );
}

const appProps: UserProps = {
  path: "/", // Add the appropriate path
};

render(<App {...appProps} />, document.getElementById("app"));
