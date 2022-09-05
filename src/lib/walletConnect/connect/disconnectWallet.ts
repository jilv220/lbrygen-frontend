import web3Modal from "./web3Modal";

const disconnectWallet = async () => {
  await web3Modal.clearCachedProvider();
}
export default disconnectWallet;