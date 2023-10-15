import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthorizedUserStore from "./store/AuthorizedUserStore";
import UsersStore from "./store/UsersStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
          authorizedUser: new AuthorizedUserStore(),
          users: new UsersStore()
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);
