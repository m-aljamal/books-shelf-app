import React from "react";
import axios from "axios";
function Logout(props) {
  let request = axios.get("/api/logout").then(response => {
    setTimeout(() => {
      props.history.push("/");
    }, 2000);
  });

  return (
    <div>
      <h1>Good bye come back soon</h1>
    </div>
  );
}

export default Logout;
