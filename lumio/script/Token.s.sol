// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Token} from "../src/Token.sol";
import {Script, console2} from "forge-std/Script.sol";

contract TokenScript is Script {
    function run() public {
        vm.startBroadcast();

        Token token = new Token();

        console2.log("Token deployed at: ", address(token));

        vm.stopBroadcast();
    }
}
