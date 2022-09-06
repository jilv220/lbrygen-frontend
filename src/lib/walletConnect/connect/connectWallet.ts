import { providers } from "ethers"
import web3Modal from "./web3Modal";
import Logger from "@/utils/Logger";

const logger = new Logger('connectWallet')

const connectWallet = async () => {
  try {
    const provider = await web3Modal.connect()
    provider.on("accountsChanged", (provider) => {
      console.log('connect', provider);
    });

    const library = new providers.Web3Provider(provider);
    const signer = await library.getSigner();
    const address = await signer.getAddress();
    const network = await library.getNetwork();

    provider.on("disconnect", (code, reason) => {

    });

    provider.on("chainChanged", (chainId) => {

    });

  } 
  catch (error) {
    logger.error(error)
    return error
  }
};

export default connectWallet;