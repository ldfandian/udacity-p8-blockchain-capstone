// prepare the test env
var chai = require('../../node_modules/chai');
chai.use(require('../../node_modules/chai-as-promised'))
chai.should();

var expect = chai.expect;
var assert = chai.assert;

var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const TestERC721Name_one = 'TestERC721Contract-One';
    const TestERC721Symbol_one = 'TEC1';
    const TestERC721Name_two = 'TestERC721Contract-Two';
    const TestERC721Symbol_two = 'TEC2';

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(
                TestERC721Name_one, TestERC721Symbol_one, { from: account_one });

            // mint multiple tokens
            await this.contract.mint(account_one, 1, "");
            await this.contract.mint(account_one, 2, "");
            await this.contract.mint(account_two, 3, "");
        })

        it('should return total supply', async function () { 
            assert.equal(await this.contract.totalSupply(), 3);
        })

        it('should get token balance', async function () { 
            assert.equal(await this.contract.balanceOf(account_one), 2);
            assert.equal(await this.contract.balanceOf(account_two), 1);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            assert.equal(await this.contract.tokenURI(1), 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
            assert.equal(await this.contract.tokenURI(2), 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2');
            assert.equal(await this.contract.tokenURI(3), 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3');
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one, account_two, 1, { from:account_one });
            assert.equal(await this.contract.ownerOf(1), account_two);

            await this.contract.transferFrom(account_two, account_one, 1, { from:account_two });
            assert.equal(await this.contract.ownerOf(1), account_one);

            assert.isRejected(this.contract.transferFrom(account_one, account_two, 1, { from:account_two }));
            assert.isRejected(this.contract.transferFrom(account_two, account_one, 2, { from:account_one }));

            assert.isRejected(this.contract.transferFrom(account_one, account_one, 1, { from:account_one },
                'cannot transfer to the same address'));

            assert.isRejected(this.contract.transferFrom(account_one, '0x0000000000000000000000000000000000000000', 1, { from:account_one },
                'to address is invalid'));

            assert.isRejected(this.contract.transferFrom(account_two, account_one, 2, { from:account_one }),
                'from address is not the owner of the given token');

            assert.isRejected(this.contract.transferFrom(account_one, account_two, 100000, { from:account_one }));
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(
                TestERC721Name_two, TestERC721Symbol_two, {from: account_two});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            assert.isRejected(this.contract.mint(account_one, 10, "", { from:account_one }),
                'Only owner can call the function');
        })

        it('should return contract owner', async function () { 
            assert.equal(await this.contract.getOwner(), account_two);
        })

    });
})
