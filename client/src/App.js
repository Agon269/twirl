import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthProvider } from "./Auth";
import Solution from "./pages/Solution";
// import Solutions from "./pages/Solutions";
import EditSolution from "./pages/EditSolution";
import User from "./pages/User";
import Error404 from "./pages/Error404";
import Header from "./components/Header";
import CreateSolution from "./pages/CreateSolution";
import ProtectedRoute from "./components/ProtectedRoute";
import history from "./history";
import CreateProblem from "./pages/CreateProblem";
import Problem from "./pages/Problem";
import Problems from "./pages/Problems";
import EditProblem from "./pages/EditProblem";
import SFP from "./pages/SFP";

export default function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/signin" component={Signin} />

            <Route exact path="/signup" component={Signup} />

            <ProtectedRoute
              exact
              path="/createsolution"
              component={CreateSolution}
            />
            <ProtectedRoute
              exact
              path="/createproblem"
              component={CreateProblem}
            />
            <ProtectedRoute exact path="/problemsolution/:id" component={SFP} />

            <Route exact path="/solution/:id" component={Solution} />

            <Route exact path="/problem/:id" component={Problem} />

            <Route exact path="/problems" component={Problems} />

            <Route exact path="/solution/edit/:id" component={EditSolution} />

            <Route exact path="/problem/edit/:id" component={EditProblem} />

            <Route exact path="/user/:id" component={User} />

            <Route exact path="/404" component={Error404} />

            <Redirect from="*" to="/404" />
          </Switch>
        </>
      </Router>
    </AuthProvider>
  );
}
