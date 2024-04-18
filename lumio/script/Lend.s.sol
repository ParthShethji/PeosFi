// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Token} from "../src/Token.sol";
import {ZeroFiP2PLending} from "../src/ZeroFiP2PLending.sol";
import {ZeroFiSocialPool} from "../src/ZeroFiSocialPool.sol";
import {Script, console2} from "forge-std/Script.sol";

contract LendingScript is Script {
    function run() public {
        vm.startBroadcast();

        Token token = new Token();
        console2.log("Token deployed at: ", address(token));

        ZeroFiP2PLending lending = new ZeroFiP2PLending(token);
        console2.log("ZeroFiP2PLending deployed at: ", address(lending));
        
        ZeroFiSocialPool pool = new ZeroFiSocialPool(address(lending), token);
        console2.log("ZeroFiSocialPool deployed at: ", address(pool));

        vm.stopBroadcast();
    }
}