pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
    Verifier private verifierContract;
    
    /**
     * constructor
     */
    constructor(address verifierAddress, string memory name, string memory symbol) 
        ERC721MintableComplete(name, symbol) 
        public 
    {
        require(verifierAddress != address(0), 'invalid verifier contract address');

        verifierContract = Verifier(verifierAddress);
    }

    // define a solutions struct that can hold an index & an address
    struct Solution {
        bool minted;
        uint256 id;
        address from;
    }
    // define an array of the above struct
    Solution[] private solutions;
    // define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private hash2solutions;

    // Create an event to emit when a solution is added
    event SolutionAdded(uint256 id, address to);
    event SolutionMinted(uint256 id, address to);

    // Create a function to add the solutions to the array and emit the event
    function addSolution(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory inputs)
        public
        returns (uint256 tokenId)
    {
        bytes32 solutionHash = keccak256(abi.encodePacked(inputs[0], inputs[1]));
        require(hash2solutions[solutionHash].from == address(0), 'solution has been added');

        bool verified = verifierContract.verifyTx(a, b, c, inputs);
        require(verified, 'verification of the solution failed');

        // index starts from 0, we use olutions.length
        Solution memory one = Solution(false, solutions.length, msg.sender);
        hash2solutions[solutionHash] = one;
        solutions.push(one);

        emit SolutionAdded(one.id, one.from);
        return one.id;
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(uint[2] memory inputs, address to)
        whenNotPaused
        public
        returns (uint256 tokenId)
    {
        bytes32 solutionHash = keccak256(abi.encodePacked(inputs[0], inputs[1]));
        
        // check
        Solution storage one = hash2solutions[solutionHash];
        require(one.from != address(0), 'solution does not exist');
        require(!one.minted, 'solution has been minted');
        require(one.from == msg.sender, 'it is not your solution');

        // result
        // we don't call super.min, coz it requries 'onlyOwner'
        super._mint(to, one.id);
        setTokenURI(one.id, '');

        // effect
        emit SolutionMinted(one.id, to);
        return one.id;
    }

}

























