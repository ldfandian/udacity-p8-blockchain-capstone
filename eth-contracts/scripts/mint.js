/**
 * The original file comes from https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js
 * It is modified to accommendate the project's requirement.
 * 
 * Usage:
 *   cd ./scripts/
 * 
 *   export PROOF_FILE="../../zokrates/proof_square_9/proof.json"
 *   export ENV_OWNER_ADDRESS="..."
 *   export ENV_INFURA_API_KEY="..."
 *   export ENV_NFT_CONTRACT_ADDRESS="..."
 *   export ENV_INFURA_API_KEY="..."
 * 
 *   node mint.js
 */

const BigNumber = require('bignumber.js');
const { exit } = require('process');

const HDWalletProvider = require("../../node_modules/truffle-hdwallet-provider");
const web3 = require("../../node_modules/web3");

const SolnSquareVerifier = require("../build/contracts/SolnSquareVerifier.json");
const NFT_ABI = SolnSquareVerifier.abi;

/**
 * Environment Variables - initialization
 */
const ENV_PROOF_FILE = process.env.PROOF_FILE;
const ENV_OWNER_ADDRESS = process.env.OWNER_ADDRESS || '0x4C05a7AD71b652564954651593e0605e7041C04a';

const ENV_INFURA_API_KEY = process.env.INFURA_KEY || 'b1e58431d4b14c639767eb364767aff6';
const ENV_NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || '0x2D9665Fd5410B237f2A228a64D07a743dE5f4B90';

var ENV_MNEMONIC = process.env.MNEMONIC;
if (!ENV_MNEMONIC) {
    const fs = require('fs');
    ENV_MNEMONIC = fs.readFileSync("../rinkeby-account-mnemonic.secret").toString().trim();
}
const PROOF_FILECONTENT = require(ENV_PROOF_FILE);

if (!ENV_MNEMONIC || !ENV_INFURA_API_KEY || !ENV_OWNER_ADDRESS || !ENV_PROOF_FILE || !ENV_NFT_CONTRACT_ADDRESS) {
    console.error("Please set 1) a mnemonic, 2) infura key, 3) owner, 4) contract address, 5) proof file.");
    return;
}

/**
 * Code Logic - starts here
 */

// utils to convert the 0x-(HEX) format data to its decimal value
function getProofData(proofJsonFileContent) {
    return {
        a: [
            new BigNumber(proofJsonFileContent.proof.a[0], 16).toFixed(),
            new BigNumber(proofJsonFileContent.proof.a[1], 16).toFixed(),
        ],
        b: [
            [
                new BigNumber(proofJsonFileContent.proof.b[0][0], 16).toFixed(),
                new BigNumber(proofJsonFileContent.proof.b[0][1], 16).toFixed(),
            ],
            [
                new BigNumber(proofJsonFileContent.proof.b[1][0], 16).toFixed(),
                new BigNumber(proofJsonFileContent.proof.b[1][1], 16).toFixed(),
            ],
        ],
        c: [
            new BigNumber(proofJsonFileContent.proof.c[0], 16).toFixed(),
            new BigNumber(proofJsonFileContent.proof.c[1], 16).toFixed(),
        ],
        inputs: [
            new BigNumber(proofJsonFileContent.inputs[0], 16).toFixed(),
            new BigNumber(proofJsonFileContent.inputs[1], 16).toFixed(),
        ],
    };
}

async function main() {
    const provider = new HDWalletProvider(
        ENV_MNEMONIC,
        "https://rinkeby.infura.io/v3/" + ENV_INFURA_API_KEY,
        0,
        10
    );
    const web3Instance = new web3(provider);
    const contract = new web3Instance.eth.Contract(
        NFT_ABI,
        ENV_NFT_CONTRACT_ADDRESS,
        { gasLimit: "10000000" }
    );

    const proofData = getProofData(PROOF_FILECONTENT);

    try {
        let result = await contract.methods
            .addSolution(proofData.a, proofData.b, proofData.c, proofData.inputs)
            .send({ from: ENV_OWNER_ADDRESS });
        console.log(`addSolution(...) is successful. Owner='${ENV_OWNER_ADDRESS}', Transaction='${result.transactionHash}'. Proof: ${JSON.stringify(proofData)}`);
    } catch (error) {
        console.error(`addSolution(...) is failed. Owner='${ENV_OWNER_ADDRESS}'. ${error}`);
    }

    try {
        let result = await contract.methods
            .mintNewNFT(proofData.inputs, ENV_OWNER_ADDRESS)
            .send({ from: ENV_OWNER_ADDRESS });
        console.log(`mintNewNFT(...) is successful. Owner='${ENV_OWNER_ADDRESS}', Transaction='${result.transactionHash}'. Proof: ${JSON.stringify(proofData)}`);
    } catch (error) {
        console.error(`mintNewNFT(...) is failed. Owner='${ENV_OWNER_ADDRESS}'. ${error}`);
    }

    exit(0);
}

main();