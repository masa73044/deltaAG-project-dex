import React from "react";
import Logo from "../swaplogo.png";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { address, isConnected, connect } = props;
  return (
    <header className="taskbar">
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />

        <Link to="/" className="link">
          <div className="task-bar-item">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="task-bar-item">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="task-bar-item2">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>
        <div className="connectButton" onClick={connect}>
          {isConnected
            ? address.slice(0, 4) + "..." + address.slice(38)
            : "Connect"}
        </div>
      </div>
    </header>
  );
}

export default Header;
