import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from "./pages/LandingPage/LandingPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignPage from "./pages/SignPage/SignPage";
import RecipesListPage from "./pages/RecipesListPage/RecipesListPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import {CONTEXT_PATH} from "./properties";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MyFridgePage from "./pages/MyFridgePage/MyFridgePage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={`${CONTEXT_PATH}/recipe/:id`}>
                <RecipePage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/edit-recipe/:id`}>
                <EditRecipePage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/add-recipe`}>
                <AddRecipePage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/error-page`}>
                <ErrorPage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/what-is-in-my-fridge`}>
                <MyFridgePage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/recipes`}>
                <RecipesListPage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/sign`}>
                <SignPage/>
            </Route>
            <Route path={`${CONTEXT_PATH}/`}>
                <LandingPage/>
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
