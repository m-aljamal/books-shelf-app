import React from "react";
import Header from '../header/Header'
function Layout(props) {
  return (
    <div>
        <Header/>
      <div>{props.children}</div>
      {/* Footer */}
    </div>
  );
}

export default Layout;
