import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);