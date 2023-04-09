import React from "react";
import "./Windows90sModal.css";
import tokenList from "../tokenList.json";

const WindowSwap = ({ open, title, children, onCancel }) => {
  if (!open) return null;

  return (
    <div className="Windows90sModal">
      <div className="Windows90sModal-header">
        <h2 className="Windows90sModal-title">{title}</h2>
        <span className="Windows90sModal-close" onClick={onCancel}>
          x
        </span>
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div className="tokenChoice" key={i}>
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Windows90sModal-content">{children}</div>
    </div>
  );
};

export default WindowSwap;
