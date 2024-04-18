// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";

import {ZeroFiSocialPool} from "./ZeroFiSocialPool.sol";
import {LoanStatus, LoanTerms, Loan} from "./Commons.sol";
import {Ray, a} from "./Types.sol";

contract PoolTest is Test {
    function testBorrow() public {
        bytes memory sig;
        ZeroFiSocialPool pool = ZeroFiSocialPool(0x8c768Af8ebd9d692A536c8278b1Ed5Fd54F714c7);
        vm.prank(0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2);
        pool.borrow(LoanTerms({
            borrower: 0x674dc72D0738D2f905aE9F3ef17C0384c8bd28d2,
            amount: 10 ether,
            interestRate: Ray.wrap(1e27),
            limitRepayDate: block.timestamp + 1 days
        }), sig, 0);
    }
}