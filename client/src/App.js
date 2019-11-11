import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/high_order_components/Layout";
import Book from "./pages/Book";
import "./App.css";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AddReview from "./pages/AddReview";
// in Auth there is loader and check if you have user login
import Auth from "./components/high_order_components/Auth";
import UserReviews from "./pages/UserReviews";
import EditReviews from "./pages/EditReviews";
import AddAdmin from './pages/AddAdmin'
import Logout from './pages/Logout'
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/books/:id" component={Auth(Book)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/user" component={Auth(UserProfile, true)} />
          <Route exact path="/user/add" component={Auth(AddReview, true)} />
          <Route exact path="/user/edit-post/:postId" component={Auth(EditReviews, true)} />
          <Route exact path="/user/user-reviews" component={Auth(UserReviews, true)} />
          <Route exact path="/user/register" component={Auth(AddAdmin, true)} />
          <Route exact path="/user/logout" component={Auth(Logout, true)} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
