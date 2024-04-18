// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Script} from "forge-std/Script.sol";

import {TestCurrency} from "./TestCurrency.sol";
import {ZeroFiP2PLending} from "./ZeroFiP2PLending.sol";
import {ZeroFiSocialPool} from "./ZeroFiSocialPool.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        TestCurrency currency = new TestCurrency("USD Coin", "USDC");
        ZeroFiP2PLending p2p = new ZeroFiP2PLending(IERC20(address(currency)));
        ZeroFiSocialPool pool = new ZeroFiSocialPool(0xefBFbf7Ec0eF128376eD0f40Ec8D2A3B8952609a, IERC20(address(currency)));
        currency.mint(100 ether, 0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2);
        currency.mint(100 ether, 0xefBFbf7Ec0eF128376eD0f40Ec8D2A3B8952609a);
        currency.openApprove(0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2, address(pool), 100 ether);
        currency.openApprove(0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2, address(p2p), 100 ether);
        currency.mint(100 ether, address(pool));
    }
}