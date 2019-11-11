import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../redux/actions/index";
import { Table } from "react-bootstrap";
import moment from "moment-js";
import { Link } from "react-router-dom";
import "./UserReviews.scss";
class UserReviews extends Component {
  componentDidMount() {
    this.props.dispatch(getUserPosts(this.props.user.login.id));
  }

  renderTabel = user =>
    user.userPosts &&
    user.userPosts.map((post, index) => (
      
        <tr key={post._id}>
          <td className='UserReviews_align'> {index +1 }</td>
          <td>
            <Link to={`/user/edit-post/${post._id}`}>
              <img className='UserReviews_img' src={post.coverImage} alt={post.name}/>
            </Link>
          </td>
          <td className='UserReviews_align'>{post.name}</td>
          <td className='UserReviews_align'>{post.author}</td>
          <td className='UserReviews_align'>{moment(post.createdAt).format("D/M/YYYY")}</td>
        </tr>
     
    ));

  render() {
    const userPosts = this.props.user;

    return (
      <div className="UserReviews">
        <h4>Your Reviews:</h4>
        <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.renderTabel(userPosts)}</tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(UserReviews);
