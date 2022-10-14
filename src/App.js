import "./App.css";
import { Provider } from "react-redux";
import Store from "./AppRedux/Store";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import Routes from "./AppRoute/Routes";

function App() {
  return (
    <div className="app">
      <Provider store={Store}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
