import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import appRoutes from "./appRoutes";
import PublicLayout from "../containers/Layout/PublicLayout";
import setAuthToken from "../utils/setAuthToken";

import HomePage from "../pages/Home";

// we will use this components for the restricted routes which can be accessed after login only
// const RestrictedRoute = (props) => (
//   <Fragment>
//     {props.isLoggedIn === true ? (
//       <Route exact path={props.path} component={props.component} />
//     ) : (
//       <Redirect to={appRoutes.login} from={props.path} />
//     )}
//   </Fragment>
// );

// We will use this component for public routes which cannot be access after login
const PublicRoute = (props) => (
  <Fragment>
    {props.isLoggedIn === false ? (
      <Route exact path={props.path} component={props.component} />
    ) : (
      <Redirect to="/" from={props.path} />
    )}
  </Fragment>
);

class AppRoutes extends PureComponent {
  render() {
    const { history } = this.props;
    const auth = this.props.auth;

    //set the token even after page refreshes
    setAuthToken(auth.token ? auth.token : false);

    return (
      <>
        <Router history={history}>
          <Switch>
            <PublicLayout>
              <PublicRoute
                path={appRoutes.homePage}
                component={HomePage}
                isLoggedIn={auth.isLoggedIn}
              />
            </PublicLayout>

            {/* <Redirect from="*" to="/404" /> */}
          </Switch>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppRoutes);
