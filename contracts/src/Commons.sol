// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Ray} from "./Types.sol";

enum LoanStatus {
    Ongoing,
    Repaid,
    Defaulted
}

struct LoanTerms {
    address borrower;
    uint256 amount;
    Ray interestRate;
    uint256 limitRepayDate;
}

struct Loan {
    LoanTerms terms;
    uint256 initiationDate;
    uint256 repayDate; // 0 value means not repaid
}