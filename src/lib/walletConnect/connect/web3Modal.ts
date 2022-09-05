import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
    walletconnect : {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.VUE_APP_INFURA_ID
      }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions,
});

export default web3Modal