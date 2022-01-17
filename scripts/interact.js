const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const {ethers} = require("hardhat");
//import contract HelloWorld contract from artifacts
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

// provider - Alchemy | node provider gives you read access to the blockchain
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);  

//signer - user | owner signs transactions inorder to interact with the blockchain
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider); //private key && Entry point

const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  // update contract to "GoodBye World"
  const message = await helloWorldContract.message();
  console.log(`The message is: ${message}`);

  console.log('Updating the message...');
  const tx = await helloWorldContract.update('This is the new message')
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log(`The new message is: ${newMessage}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })