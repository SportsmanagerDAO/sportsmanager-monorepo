// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/SportsManagerDAOLogicV1.sol';

contract SportsManagerDAOLogicV1Harness is SportsManagerDAOLogicV1 {
    function initialize(
        address timelock_,
        address sportsManager_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'SportsManagerDAO::initialize: admin only');
        require(address(timelock) == address(0), 'SportsManagerDAO::initialize: can only initialize once');

        timelock = ISportsManagerDAOExecutor(timelock_);
        sportsManager = SportsManagerTokenLike(sportsManager_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
