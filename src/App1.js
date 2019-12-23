import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import Header from "./components/header/header.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // want to know when firebase realizes authentication state has changed
    // subscription - subcriber always listening to auth to detect change in state
    // ensures persistence of user
    // this is an open subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user});

      // console.log(user);
      // createUserProfileDocument(user);
      if (userAuth) {
        // we need the userRef to check if out database has updated at that reference with any new data
        const userRef = await createUserProfileDocument(userAuth);
        // checking if snapshot has changed, send us a snaphot of data in our database

        userRef.onSnapshot(snapShot => {
          // get data related to the user that we have just stored or that is already stored
          // .data() allows us to actually see what out data loooks like
          // returns us an object with properties we need -> but it doesn't have an id
          // console.log(snapShot.data()); thus we use both snapShot and snapShot.data() to set our state
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      // incase user signs out, we want to set our current user to null
      this.setState({ currentUser: userAuth });
    });
  }

  // close subscription whenever the components get unmounted
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        {/** Call Header outside the Switch to ensure that it is always present regardless of the links you click */}
        <Header currentUser={this.state.currentUser} />
        <Switch>
          {/**Switch matches the exact path to render */}
          {/** Route only passes the three props to the component specified and not to the children of the components such as Menu Item */}
          <Route exact component={HomePage} path={"/"} />
          <Route component={Shop} path={"/shop"} />
          <Route component={SignInAndSignUpPage} path={"/signin"} />
        </Switch>
      </div>
    );
  }
}

export default App1;
