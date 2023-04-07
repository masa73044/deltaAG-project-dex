import React from "react";
import Logo from "../swaplogo.png";
import { Link } from "react-router-dom";

function Taskbar(props) {
  const { address, isConnected, connect } = props;
  return (
    <header>
      <body>
        <div className="taskbar">
          <img src={Logo} alt="logo" className="logo" />
          <div className="taskbar-items">
            <div className="taskbar-item">
              <Link to="/" className="link">
                <div>Swap</div>
              </Link>
            </div>
            <div className="taskbar-item">
              <Link to="/tokens" className="link">
                <div>Tokens</div>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </header>
  );
}

export default Taskbar;
