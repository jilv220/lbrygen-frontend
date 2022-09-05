import { providers } from "ethers"
import web3Modal from "./web3Modal";

const connectWallet = async () => {
  try {
    const provider = await web3Modal.connect()

    const library = new providers.Web3Provider(provider);
    const signer = await library.getSigner();
    const address = await signer.getAddress();
    const network = await library.getNetwork();

    provider.on("disconnect", (code, reason) => {

    });

    provider.on("accountsChanged", (accounts) => {

    });

    provider.on("chainChanged", (chainId) => {

    });

  } 
  catch (error) {
    console.log(error);
    return error
  }
};

export default connectWallet;