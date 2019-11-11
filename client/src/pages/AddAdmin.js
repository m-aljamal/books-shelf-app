import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Table } from "react-bootstrap";
import {getUsers, userRegister} from '../redux/actions/index'
import "./AddAdmin.scss";
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class AddAdmin extends PureComponent {
  state = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    error: ""
  };

  componentDidMount(){
      this.props.dispatch(getUsers())
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({error: ''})
    this.props.dispatch(userRegister({
       email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        lastname: this.state.lastName
    },
        this.props.user.users
    ))
   
  };

  showUsers = (user) =>(
      user.users &&

user.users.map((user, index) =>(
        <tr >
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
      </tr>

      ))
  
  )
componentWillReceiveProps(nextProps){
      if(nextProps.user.register === false){
         this.setState({error: 'Error plese try again'}) 
      }  else{
          this.setState({
            name: "",
            lastName: "",
            email: "",
            password: ""
           
          })
      }
}
  render() {
    
      let user = this.props.user
    return (
      <div className="AddAdmin_container">
        <div className="Login_form_divider"></div>
        <div className="AddAdmin_form">
          <Form className="Add_Admin_formContaint" onSubmit={this.handleSubmit}>
            <h4>Add Admins:</h4>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                required
                type="text"
                placeholder="Lastname"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Form.Group>
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
            <div className='Addadmin_button'>
            <Button
              variant="primary"
              type="submit"
              className="AddAdmin_button"
            >
              Add user
            </Button>
            <div className='Addadmin_error'>
                {this.state.error}
                 </div>
            </div>
          </Form>
        </div>

        <div className="current_users">
          <h4>Current users: </h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
             
             {this.showUsers(user)}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddAdmin);
