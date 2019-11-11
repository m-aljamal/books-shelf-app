import React from "react";
import "./Book_items.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { withRouter } from "react-router-dom";

// author: "me"
// createdAt: "2019-11-02T14:16:44.501Z"
// name: "k"
// ownerId: "1"
// pages: "250"
// price: "250"
// rating: 2
// review: "good"
// coverImage:
// updatedAt: "2019-11-02T14:16:44.501Z"
// __v: 0
// _id: "5dbd8fcc13e56d22147e40c9"
function Book_items(props) {
  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => props.history.push(`/books/${props._id}`)}
        >
          <div className="Book_items_container">
            <div className="Book_items_img">
              <img src={props.coverImage} />
            </div>
            <div className="Book_items_containt">
              <div className="Book_items_title">
                <h4>{props.name}</h4>
              </div>

              <div className="Book_items_footer">
                <p>By: {props.author}</p>
                <p>Rating: {props.rating}</p>
              </div>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
}

export default withRouter(Book_items);
