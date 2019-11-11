import React, { Component } from "react";
import { getBookWithReviewer , clearBookWithReviewer} from "../../redux/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from 'moment-js'
import "./BookView.scss";
class BookView extends Component {
  componentDidMount() {
    this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
  }
  // this to clear book after user leave the page
componentWillUnmount(){
  this.props.dispatch(clearBookWithReviewer())
}
  render() {
    let book = "";
    if (this.props.books.book) book = this.props.books.book;
    const date = moment(book.createdAt).format('YYYY')
    // console.log(date)
    console.log(book.createdAt)
    return (
      <div className="BookView_container">
        <div className="BookView_img">
          <img src={book.coverImage} />
        </div>
        <div className="BookView_bookInfo">
          <h2>{book.name}</h2>
          <h4>By: {book.author}</h4>
          <p>Pages: {book.pages}</p>
          <p>Price: ${book.price}</p>
          <p>Review: {book.review}</p>
          <p>Rating: {book.rating}</p>
          <p>Created At: {date}</p>
        </div>
      </div>
    );
  }
}
const matchStateToProps = state => ({
  books: state.books
});
export default withRouter(connect(matchStateToProps)(BookView));
