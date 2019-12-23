import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { connect } from "react-redux";
// we need user action to set the state of the current user
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // checking if snapshot has changed, send us a snaphot of data in our database
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          // incase user signs out, we want to set our current user to null
          this.props.setCurrentUser(userAuth);
        });
      }
    });
  }

  // close subscription whenever the components get unmounted
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/**Switch matches the exact path to render */}
          {/** Route only passes the three props to the component specified and not to the children of the components such as Menu Item */}
          <Route exact component={HomePage} path={"/"} />
          <Route component={Shop} path={"/shop"} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          {/* <Route component={SignInAndSignUpPage} path={"/signin"} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// our component does not use the currentUser at all thus no need for mapStateToProps
// it just sets the state of the current User
export default connect(mapStateToProps, mapDispatchToProps)(App);
