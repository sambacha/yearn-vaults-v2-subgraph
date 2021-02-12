import { Contract } from "web3-eth-contract";

import {
  getContractAbi,
  //getGraphQLInstance,
  getWeb3Instance
} from "./../src/config";
import { getTotalSupply, getTransfers } from "./../src/erc20Web3Helpers";

// fixme 
VAULT_ADDRESS_MAINNET = 

//const graphUrl = "http://localhost:8000/subgraphs/name/${GITHUB_REPO}/vault";
const infuraEndpoint =
  "https://mainnet.infura.io/v3/ecb81cbe2f03436cb39236e4160311fe";
const erc20fileName = "erc20.abi.json";
const vaultContractAddress = "VAULT_ADDRESS_MAINNET";

//let gql = getGraphQLInstance(graphUrl);
let erc20abi;
let web3;
let vaultContract: Contract;

beforeAll(() => {
  jest.setTimeout(50000);

  erc20abi = getContractAbi(erc20fileName);
  web3 = getWeb3Instance(infuraEndpoint);
  vaultContract = new web3.eth.Contract(erc20abi, vaultContractAddress);
});

const txhash =
  "0x709fe6656b2aa9efbd6d36eba51a2f4b5720a2a8eaafecfc249e7116736cc085";
test(`Values for vault Contract tx: ${txhash}`, async () => {
  const vaultRandomAddress = "0x0e0ec712b3912b5601216455a158cf18152cb62a";
  const accountTransfers = await getTransfers(vaultContract, vaultRandomAddress);

  const txInfo = accountTransfers.find(transfer => (transfer.tx === txhash));

  expect(txInfo).toEqual({
    tx: txhash,
    from: vaultRandomAddress,
    to: "0x39755357759ce0d7f32dc8dc45414cca409ae24e",
    value: "53,608"
  });
});
