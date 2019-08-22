import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";
import Favorites from "./FavoriteComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, deleteComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, 
  postFeedback, postFavorite, deleteFavorite, fetchFavorites, loginUser, logoutUser, signupUser } from '../redux/ActionCreaters';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return { 
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
  deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (username, password, firstname, lastname) => signupUser(username, password, firstname, lastname)
});

class Main extends Component {
  
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {
    
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess} />
      );
    }

    const checkFavorite = (dishId) => {
      if (!this.props.auth.isAuthenticated)
        return false;
      else if (!this.props.favorites.favorites)
        return false;
      else
        return this.props.favorites.favorites.dishes.some((dish) => dish._id === dishId);
    };

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
          auth={this.props.auth}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)} 
          commentsErrMess={this.props.comments.errMess}
          favorite = {checkFavorite(match.params.dishId)}
          postComment={this.props.postComment}
          deleteComment={this.props.deleteComment}
          postFavorite={this.props.postFavorite}
          deleteFavorite={this.props.deleteFavorite} />
      );
    }


    return (
      <div>
        <Header auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          signupUser={this.props.signupUser} />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" 
                component={() => 
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback} />
                } />
              <Route exact path="/favorites" 
                component={() => 
                  <Favorites favorites={this.props.favorites}
                      auth={this.props.auth}
                      deleteFavorite={this.props.deleteFavorite} /> 
                } />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}  />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
