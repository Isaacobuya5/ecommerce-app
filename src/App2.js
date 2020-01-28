import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header.component.jsx";
import CheckoutPage from "./components/checkout/checkout.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments
} from "./firebase/firebase.utils";

// For practise
import Display from "./components/styled-components/styled-component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../src/redux/user/user.selector";
// we need user action to set the state of the current user
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
    // we are checking if the auth state has changed while passing an authenticated user
    // user authenticates with google sign in or email and password
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // if user is authenticated, we pass him to the createUserProfileDocument method
        const userRef = await createUserProfileDocument(userAuth);
        // checking if snapshot has changed, send us a snaphot of data in our database
        // onSnapshot allows us to listen for the snapshot incase it changes.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          // incase user signs out, we want to set our current user to null
          setCurrentUser(userAuth);
          addCollectionAndDocuments(
            "collections",
            collectionsArray.map(({ title, items }) => ({ title, items }))
          );
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
          <Route exact component={CheckoutPage} path={"/checkout"} />
          <Route exact component={Display} path={"/practice"} />
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

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

// can be converted to use createStructuredSelectors for scalability

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// our component does not use the currentUser at all thus no need for mapStateToProps
// it just sets the state of the current User
export default connect(mapStateToProps, mapDispatchToProps)(App);
