// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {RayMath} from "./RayMath.sol";
import {Ray} from "./Types.sol";
import {LoanStatus} from "./Commons.sol";

contract ZeroFiP2PLending {
    using RayMath for Ray;
    using RayMath for uint256;

    event LoanRequested(uint256 id, DesiredLoanTerms terms);
    event LoanInitiated(uint256 id, Loan loan);

    struct DesiredLoanTerms {
        address borrower;
        uint256 amount;
        Ray interestRate;
        uint256 duration;
    }

    struct Loan {
        address borrower;
        address lender;
        uint256 amount;
        Ray interestRate;
        uint256 limitDate;
        uint256 repayDate; // 0 value means not repaid
        uint256 initiationDate;
    }

    IERC20 public immutable asset;

    constructor(IERC20 _asset) {
        asset = _asset;
    }

    mapping(uint256 => DesiredLoanTerms) public desiredLoans;
    mapping(uint256 => Loan) public loan;
    uint256 public nbOfDesiredLoans;
    uint256 public nbOfLoans;

    function requestLoan(uint256 amount, Ray interestRate, uint256 duration) external returns(uint256 id){
        id = ++nbOfDesiredLoans;
        desiredLoans[id] = DesiredLoanTerms({
            borrower: msg.sender,
            amount: amount,
            interestRate: interestRate,
            duration: duration
        });

        emit LoanRequested(id, desiredLoans[nbOfDesiredLoans]);
    }

    function lend(uint256 desiredLoanId) external returns(uint256 loanId) {
        DesiredLoanTerms memory desiredLoan = desiredLoans[desiredLoanId];
        loanId = ++nbOfLoans;
        loan[loanId] = Loan({
            borrower: desiredLoan.borrower,
            lender: msg.sender,
            amount: desiredLoan.amount,
            interestRate: desiredLoan.interestRate,
            limitDate: block.timestamp + desiredLoan.duration,
            repayDate: 0,
            initiationDate: block.timestamp
        });
        asset.transferFrom(msg.sender, desiredLoan.borrower, desiredLoan.amount);
         
        emit LoanInitiated(loanId, loan[loanId]);
    }

    function repay(uint256 loanId) external {
        Loan memory loanRepaid = loan[loanId];

        uint256 amountToRepay = loanRepaid.amount + loanRepaid.amount.mul(
            loanRepaid.interestRate.mul(block.timestamp - loanRepaid.initiationDate));
        asset.transferFrom(msg.sender, loanRepaid.lender, amountToRepay);
        loan[loanId].repayDate = block.timestamp;
    }

    function getLoanStatus(uint256 loanId) public view returns(LoanStatus) {
        Loan memory loanToCheck = loan[loanId];

        if (loanToCheck.repayDate != 0) {
            if (loanToCheck.repayDate > loanToCheck.limitDate) {
                return LoanStatus.Defaulted;
            } else {
                return LoanStatus.Repaid;
            }
        }
        if (block.timestamp > loanToCheck.limitDate) {
            return LoanStatus.Defaulted;
        }
        return LoanStatus.Ongoing;
    }
}