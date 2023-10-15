import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authorizedRoutes, publicRoutes } from "../routes";
import MainTable from "../pages/MainTable";
import {Context} from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const {authorizedUser} = useContext(Context);
    return (
        <Routes>
            {authorizedUser.isAuth &&
                authorizedRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} Component={Component} exact />
                ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} Component={Component} exact />
            ))}
            <Route path="*" element={<Navigate to={MainTable} />} />
        </Routes>
    );
});

export default AppRouter;
