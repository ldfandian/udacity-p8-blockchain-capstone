# Udacity Blockchain Capstone

In this project you will be minting your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property. We covered the basics on zk-SNARKs in Privacy lesson in Course 5

Once the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase. Let's get started!

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

### 1. For OS environment, you can find my Docker file at [Docker File](./.devcontainer/Dockerfile) ; Please take a look to see the basic package dependency.

### 2. To install, download or clone the repo, then:
```bash
root@b6d633a70f28:/mnt/devroot/src# truffle version
Truffle v5.1.43 (core: 5.1.43)
Solidity v0.5.16 (solc-js)
Node v10.15.3
Web3.js v1.2.1

root@b6d633a70f28:/mnt/devroot/src/udacity-p8-blockchain-capstone/eth-contracts# npm install
...

```

### You can see the runlog: [truffle compile & truffle migrate](./runlog/truffle-test-localchain.log)

## Dependencies

* [NodeJS](https://nodejs.org/en/download/current/) (The install will also include the npm node package manager)
* [ganache-cli](https://github.com/trufflesuite/ganache-cli) Fast Ethereum RPC client for testing and development
* [truffle](https://www.npmjs.com/package/truffle) Development environment, testing framework and asset pipeline for Ethereum
* MetaMask extension installed in your browser and few ethers on Rinkeby Test Network.
* [Docker](https://www.docker.com/) Enterprise Container Platform for High-Velocity Innovation

## About Test

* truffle test: you can run it, all test cases can pass, but test coverage is not good enough.
** the run log of the truffle test is also put at [runlog](./runlog/truffle-test-localchain.log)

## Project Requirement

### Contract addresses on rinkeby test network and ABI

#### 1. Verifier (Contract Address): `0x247B65D3104deAE636A6716C7a30bdf0E6c5cE3B`
* [Verifier (Contract Address)](https://rinkeby.etherscan.io/address/0x247B65D3104deAE636A6716C7a30bdf0E6c5cE3B)

#### 2. SolnSquareVerifier (Contract Address): `0x2D9665Fd5410B237f2A228a64D07a743dE5f4B90`
* [SolnSquareVerifier (Contract Address)](https://rinkeby.etherscan.io/address/0x2D9665Fd5410B237f2A228a64D07a743dE5f4B90)

### 3. Contract ABI
* Can be found on [./runlog/build-contracts-backup/](./runlog/build-contracts-backup/) folder of current repository

### 4. OpenSea MarketPlace Storefront link
* [Minter Account](https://rinkeby.opensea.io/accounts/0x4C05a7AD71b652564954651593e0605e7041C04a)
* [Buyer Account](https://rinkeby.opensea.io/accounts/0x93Ae92E99D05DEc0A15B392478a1930cdA6Bba8d)

### 5. How to mint tokens
* See [Token Mint Script](./eth-contracts/scripts/mint.js) for the script usage
  - See [Token Mint Log](./runlog/mint-proof.log) for token minter's runlog
* See [zokrates](./zokrates/) for zokrates setup
  - [zokrates/code](./zokrates/code/) is the source code of the verifier
  - [zokrates/verifier_square](./zokrates/verifier_square/) is the workdir for the verifier
  - [zokrates/proof_square_*] is the workdir for the all the minter. you can also find the 'proof.json' here.

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
