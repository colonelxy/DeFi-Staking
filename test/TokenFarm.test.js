const { assert } = require('chai')
const { FormControlStatic } = require('react-bootstrap')

const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm

    before(async () => {
        // Load contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        // Transfer all Dapp tokens to farm 91million)
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        //send to investor

        await daiToken.transfer(investor, tokens('100'), { from: owner})
    })

    describe('Mock DAI deployment', async () => { it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')  
    }) })

    describe('Dapp Token deployment', async () => { it('has a name', async () => {
        const name = await dappToken.name()
        assert.equal(name, 'Dapp Token')  
      }) })
})