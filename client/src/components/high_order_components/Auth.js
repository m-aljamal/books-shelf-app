// this component is to check if you have user login to give access to go to differet routes
import React, { Component } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { auth } from "../../redux/actions/index";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "75px",
    justifyContent: "center",
    display: "flex"
  },
  green: {
    color: "#00897B"
  }
}));
export default function(ComposedClass, reload) {
  const classes = useStyles();
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      // check if user is authentcated or not
      if (!nextProps.user.login.isAuth) {
        // user is not authed so should go to login
        if(reload){
          this.props.history.push('/login')
        }
        
      } else {
        if(reload === false){
          // if you have user go to user route
          this.props.history.push('/user')
        }
        
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <div className={classes.root}>
            <CircularProgress size={60} className={classes.green} />
          </div>
        );
      }
      // return the actual component like home or ....
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
