import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import tokenList from "../tokenList.json";

function Swap(props) {
  const { address, isConnected } = props;
  // const [messageApi, contextHolder] = message.useMessage()
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  return <>{/* <div>test</div> */}</>;
}

export default Swap;
