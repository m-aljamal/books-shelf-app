import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/index";
import { Form, Button } from "react-bootstrap";
import "./Login_form.scss";
import { withRouter } from "react-router-dom";
class Login_form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitForm(e) {
    e.preventDefault();

    this.props.dispatch(loginUser(this.state));
  }
  // is there is a user go the /user page
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) {
      this.props.history.push("/user");
    }
  }

  render() {
    let user =this.props.user
    return (
      <div className="Login_form_container">
        <div className="Login_form_divider"></div>
        <div className="Login_form_form">
          <Form className="Login_form_formContaint" onSubmit={this.submitForm}>
            <h2>LOGIN</h2>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="Login_form_button"
            >
              LOGIN
            </Button>
            <div className='error'>
             
            {
              user.login && <div>{user.login.message}</div>
            }
             </div>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  
  return {
    user: state.user
  };
};
export default withRouter(connect(mapStateToProps)(Login_form));
