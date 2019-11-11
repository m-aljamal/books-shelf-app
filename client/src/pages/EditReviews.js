import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  getBook,
  updateBook,
  clearBook,
  deleteReview
} from "../redux/actions/index";
import "./AddReview.scss";

class EditReviews extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.postId,
      name: "",
      author: "",
      review: "",
      pages: "",
      rating: "",
      price: "",
      coverImage: ""
    }
  };

  handelChange = e => {
    this.setState({
      formdata: {
        ...this.state.formdata,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formdata));
  };

  componentDidMount() {
      
    this.props.dispatch(getBook(this.props.match.params.postId));
  }
//  this will make new book with the state 
  componentWillReceiveProps(nextProps) {
    let book = nextProps.books.book;
    // update the state 
    this.setState({
      formdata: {
        _id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        pages: book.pages,
        rating: book.rating,
        price: book.price,
        coverImage: book.coverImage
      }
    });
  }

  handleDelete = () => {
      this.props.dispatch(deleteReview(this.props.match.params.postId))
  }
  redirectUser = () =>{
      setTimeout( () =>{
          this.props.history.push('/user/user-reviews')
      }, 1000)
  }

  componentWillUnmount(){
      this.props.dispatch(clearBook())
  }
  render() {
    let books = this.props.books;
    
    return (
      <div className="article_container">
        <Form onSubmit={this.handleSubmit}>
          <h2>Edit Your review</h2>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter book name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={this.handelChange}
              value={this.state.formdata.name}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter book author</Form.Label>
            <Form.Control
              name="author"
              type="text"
              placeholder="Enter author"
              onChange={this.handelChange}
              value={this.state.formdata.author}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter your review</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Your review"
              name="review"
              onChange={this.handelChange}
              value={this.state.formdata.review}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter pages number</Form.Label>
            <Form.Control
              name="pages"
              min="1"
              type="number"
              onChange={this.handelChange}
              placeholder="Pages number"
              value={this.state.formdata.pages}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Select book rating</Form.Label>
            <Form.Control
              as="select"
              value={this.state.formdata.rating}
              name="rating"
              onChange={this.handelChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter book price</Form.Label>
            <Form.Control
              name="price"
              min="1"
              type="number"
              onChange={this.handelChange}
              placeholder="Enter Price"
              value={this.state.formdata.price}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Enter book cover image url </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handelChange}
              name="coverImage"
              placeholder="http://bookcoverarchive.com/parrot_and_olivier_in_america.jpg"
              value={this.state.formdata.coverImage}
            />
          </Form.Group>
          <div className="AddReview_button_container">
            <Button
              className="AddReview_button"
              type="submit"
              variant="primary"
              type="submit"
            >
              Edit review
            </Button>
            <div className="delete_post">
              <Button onClick={this.handleDelete} className="Delete_button">Delete Review</Button>
            </div>
          </div>
          {books.updateBook && (
            <div className="edit_confirm">
              post id updated, 
              <Link
                className="edit_confirem_link"
                to={`/books/${books.book._id}`}
              >
                 Click here to see your review
              </Link>
            </div>
          )}

        {
            books.postDeleted &&
            <div className='delete_confirm'>
                  Post Deleted 
                  {this.redirectUser()} 
            </div>
        }
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  books: state.books
});
export default connect(mapStateToProps)(EditReviews);
