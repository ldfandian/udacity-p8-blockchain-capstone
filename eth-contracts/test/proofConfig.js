const BigNumber = require('bignumber.js');

const ProofFileContent_9 = require("../../zokrates/proof_square_9/proof.json");
const ProofFileContent_16 = require("../../zokrates/proof_square_16/proof.json");
const ProofFileContent_25 = require("../../zokrates/proof_square_25/proof.json");

/**
 * utils to convert the 0x-(HEX) format data to its decimal value
 */
function getProofData(proofJsonFileContent) {
    return {
        a:  [
                new BigNumber(proofJsonFileContent.proof.a[0], 16).toFixed(),
                new BigNumber(proofJsonFileContent.proof.a[1], 16).toFixed(),
            ],
        b:  [
                [
                    new BigNumber(proofJsonFileContent.proof.b[0][0], 16).toFixed(),
                    new BigNumber(proofJsonFileContent.proof.b[0][1], 16).toFixed(),
                ],
                [
                    new BigNumber(proofJsonFileContent.proof.b[1][0], 16).toFixed(),
                    new BigNumber(proofJsonFileContent.proof.b[1][1], 16).toFixed(),
                ],
            ],
        c:  [
            new BigNumber(proofJsonFileContent.proof.c[0], 16).toFixed(),
            new BigNumber(proofJsonFileContent.proof.c[1], 16).toFixed(),
            ],
        inputs: [
            new BigNumber(proofJsonFileContent.inputs[0], 16).toFixed(),
            new BigNumber(proofJsonFileContent.inputs[1], 16).toFixed(),
            ],
    };
}

var proofConfig = async function(accounts) {

    const PROOF_9 = getProofData(ProofFileContent_9);
    const PROOF_16 = getProofData(ProofFileContent_16);
    const PROOF_25 = getProofData(ProofFileContent_25);

    return {
        PROOF_9: PROOF_9,
        PROOF_16: PROOF_16,
        PROOF_25: PROOF_25,
    }
}

module.exports = {
    config: proofConfig
};