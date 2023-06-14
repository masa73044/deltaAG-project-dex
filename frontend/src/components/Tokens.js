import React from "react";
import tokenList from "../tokenList.json";

function Tokens() {
  return (
    <>
      <ul>
        <div>Tokens</div>

        {tokenList?.map((e, i) => {
          return (
            <li className="tokenChoice" key={i}>
              <img src={e.img} alt={e.ticker} className="tokenLogo" />
              <div className="tokenChoiceNames">
                <div className="tokenName">{e.name}</div>
                <div className="tokenTicker">{e.ticker}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Tokens;
