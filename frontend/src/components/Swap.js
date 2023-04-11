import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import tokenList from "../tokenList.json";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

function Swap(props) {
  const { address, isConnected } = props;
  const [messageApi, contextHolder] = message.useMessage();
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

  function handleSlippageChange(e) {
    setMenuOpen(false); // new feature

    setSlippage(e.target.value);
  }

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

  // new functions

  function handleOptionClick() {}

  async function fetchPrices(one, two) {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });
    setPrices(res.data);
  }

  async function fetchDexSwap() {
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    );

    if (allowance.data.allowance === "0") {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
      );

      setTxDetails(approve.data);
      console.log("not approved");
      return;
    }

    const tx =
      await axios.get(`https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        "0"
      )}&fromAddress=${address}&slippage=${slippage}
`);
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    messageApi.destroy();
    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction Successful",
        duration: 1.5,
      });
    } else if (txDetails.to) {
      messageApi.open({
        type: "error",
        content: "Transaction Failed",
        duration: 1.5,
      });
    }
  }, [isSuccess]);

  // const settings = (
  //   <>
  //     <div class="dropdown">
  //       <button class="dropdown-button">Slippage</button>
  //       <div class="dropdown-content" onChange={handleSlippageChange}>
  //         <button onClick={() => handleOptionClick("0.5")}>
  //           0.5%
  //         </button>
  //         <button onClick={() => handleOptionClick("Option 2")}>
  //           2.5%
  //         </button>
  //         <button onClick={() => handleOptionClick("Option 3")}>
  //           5%
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}

      <div>
        <Modal
          open={isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title="Select a Token"
        >
          <div className="modalContent">
            {tokenList?.map((e, i) => {
              return (
                <div
                  className="tokenChoice"
                  key={i}
                  onClick={() => modifyToken(i)}
                >
                  <img src={e.img} alt={e.ticker} className="tokenLogo" />
                  <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.ticker}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>

        <div class="window">
          <div class="title-bar">Delta Swap</div>
          <div class="content">
            <div class="input-container">
              <div className="input-row">
                <input
                  className="input"
                  placeholder="0"
                  value={tokenOneAmount}
                  onChange={changeAmount}
                  // disabled={!prices}
                />
                <div className="asset" onClick={() => openModal(1)}>
                  <img
                    src={tokenOne.img}
                    alt="assetOneLogo"
                    className="assetLogo"
                  />
                  {tokenOne.ticker}
                  <DownOutlined />
                </div>
              </div>

              <div className="middle-button" onClick={switchTokens}>
                <ArrowDownOutlined />
              </div>
              <div className="input-row">
                <input
                  type="text"
                  className="input"
                  placeholder="0"
                  value={tokenTwoAmount}
                  onChange={changeAmount}
                  disabled={true}
                />

                <div className="asset" onClick={() => openModal(2)}>
                  <img
                    src={tokenTwo.img}
                    alt="assetTwoLogo"
                    className="assetLogo"
                  />
                  {tokenTwo.ticker}
                  <DownOutlined />
                </div>
              </div>
            </div>
          </div>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <div className="dropdown">
              <SettingOutlined className="dropdown-button" />
            </div>
          </Popover>
          <div
            className="swap-button"
            disabled={!tokenOneAmount || !isConnected}
            onClick={fetchDexSwap}
          >
            Swap
          </div>
        </div>
      </div>
    </>
  );
}

export default Swap;
