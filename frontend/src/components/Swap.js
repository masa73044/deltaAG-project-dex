import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import tokenList from "../tokenList.json";
import WindowSwap from "./WindowSwap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

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

  const [menuOpen, setMenuOpen] = useState(false);

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // new
  const WindowWithGearButton = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

    function handleSlippageChange(e) {
      setMenuOpen(false); // new feature

      setSlippage(e.target.value);
    }

    // new

    function changeAmount(e) {
      setTokenOneAmount(e.target.value);
      if (e.target.value && prices) {
        setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
      } else {
        setTokenTwoAmount(null);
      }
    }

    function switchTokens() {
      setPrices(null);
      setTokenOneAmount(null);
      setTokenTwoAmount(null);
      const one = tokenOne;
      const two = tokenTwo;
      setTokenOne(two);
      setTokenTwo(one);
      fetchPrices(two.address, one.address);
    }

    function openModal(asset) {
      setChangeToken(asset);
      setIsOpen(true);
    }

    function modifyToken(i) {
      setPrices(null);
      setTokenOneAmount(null);
      setTokenTwoAmount(null);
      if (changeToken === 1) {
        setTokenOne(tokenList[i]);
        fetchPrices(tokenList[i].address, tokenTwo.address);
      } else {
        setTokenTwo(tokenList[i]);
        fetchPrices(tokenOne.address, tokenList[i].address);
      }
      setIsOpen(false);
    }

    async function fetchPrices(one, two) {
      const res = await axios.get(`http://localhost:3001/tokenPrice`, {
        params: { addressOne: one, addressTwo: two },
      });
      setPrices(res.data);
    }

    // new functions

    const WindowWithGearButton = () => {
      const [dropdownVisible, setDropdownVisible] = useState(false);

      const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };
    };
    return (
      <>
        <div>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          <WindowSwap
            open={isOpen}
            title="Select a Token"
            onCancel={() => setIsOpen(false)}
          ></WindowSwap>
          <div class="window">
            <div class="title-bar">Delta Swap</div>
            <div class="content"></div>
            <div className="gear-btn" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faCog} />
            </div>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
}

export default Swap;
