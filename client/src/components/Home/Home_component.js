import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../redux/actions/index";
import Book_items from "../widgets-UI/Book_items";
import "./Home_component.scss";
import Button from "@material-ui/core/Button";

class Home_component extends Component {
  componentDidMount() {
    this.props.dispatch(getBooks(8, 0, "desc"));
  }

  loadMoreBooks = () =>{
    let count = this.props.books.list.length
    this.props.dispatch(getBooks(8, count, "desc", this.props.books.list));
  }
 
  loadMore = () => {
    if (this.props.books.list && this.props.books.list.length >= 8){
      return (
      <Button
      onClick={this.loadMoreBooks}
        variant="outlined"
        style={{
          margin: " 0 auto",
          display: "block",
          color: "#004d40",
          marginTop: "46px"
        }}
      >
        Load More
      </Button>)};
  };

  renderItems = books =>
    books.list &&
    books.list.map(item => <Book_items {...item} key={item._id} />);
  render() {
    return (
      <>
        <h1 className="Home_component_tilte">List of All your Books</h1>
        <div className="Books_container">
          {this.renderItems(this.props.books)}
        </div>
        {this.loadMore()}
      </>
    );
  }
}
const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps)(Home_component);
