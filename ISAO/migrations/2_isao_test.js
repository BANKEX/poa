var ISAOTest = artifacts.require("./ISAOTest.sol");

var TestToken = artifacts.require("./ERC20/TestToken.sol");

const tbn = v => web3._extend.utils.toBigNumber(v);
const fbn = v => v.toString();
const tw = v => web3._extend.utils.toBigNumber(v).mul(1e18);
const fw = v => web3._extend.utils.fromWei(v).toString();

const TOKEN_SUPPLY = tw(110);
const MINIMAL_DEPOSIT_SIZE = tw(0.05)

const TI_DAY = tbn(86400);

module.exports = function (deployer, network, accounts) {
    if (network == "ganache" || network == "development" || network == "kovan" || network == "rinkeby" || network == "rinkeby_localhost"
        || network == "geth_dev" || network == "bankexTestNetwork") {
        const operator = accounts[0];
        const RAISING_PERIOD = TI_DAY.mul(10);
        const DISTRIBUTION_PERIOD = TI_DAY.mul(36524);
        const MINIMAL_FUND_SIZE = tw(110);
        const LIMITS = [tw(100), tw(500), tw(1000)];
        const COSTS = [tw(0.1), tw(0.2), tw(0.5)];
        const ADMIN_ADDRESS = operator;
        const PAYBOT_ADDRESS = accounts[9];
        const MINIMAL_DEPOSIT = tw(0.1);


        (async () => {

            // await deployer.deploy(TestToken, TOKEN_SUPPLY, {from: operator});
            // await TestToken.deployed();
            //
            // console.log("Token ERC20 address:");
            // console.log((TestToken.address).toString());
            //
            // console.log(JSON.stringify([RAISING_PERIOD, DISTRIBUTION_PERIOD,
            //   MINIMAL_FUND_SIZE, LIMITS, COSTS, MINIMAL_DEPOSIT, PAYBOT_ADDRESS].map(x=>x.toString())))
            //
            // await deployer.deploy(ISAOTest,
            //   RAISING_PERIOD, DISTRIBUTION_PERIOD,
            //   MINIMAL_FUND_SIZE, LIMITS, COSTS, MINIMAL_DEPOSIT,
            //   PAYBOT_ADDRESS,
            //   {from:operator});
            //
            // await ISAOTest.deployed();

            deployer.then(async function () {
                let token = await TestToken.new(TOKEN_SUPPLY);
                let isao = await ISAOTest.new(
                    RAISING_PERIOD, DISTRIBUTION_PERIOD,
                    MINIMAL_FUND_SIZE, LIMITS, COSTS, MINIMAL_DEPOSIT,
                    ADMIN_ADDRESS, PAYBOT_ADDRESS,
                    {from: operator});

                await token.approve(isao.address, TOKEN_SUPPLY, {from: operator});
                await isao.setERC20Token(token.address, {from: operator});
                await isao.acceptAbstractToken(TOKEN_SUPPLY, {from: operator});

                let a = (await isao.tokenAddress()).toString();
                let b = (isao.address).toString();

                console.log(`Address of ERC20 token: ${a}`);
                console.log(`Address of ISAO: ${b}`);
            });


        })();
    }
    else {

    }
};
