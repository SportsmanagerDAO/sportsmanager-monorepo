// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/SportsManagerDAOLogicV1.sol';

contract SportsManagerDAOImmutable is SportsManagerDAOLogicV1 {
    constructor(
        address timelock_,
        address cards_,
        address admin_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) {
        admin = msg.sender;
        initialize(timelock_, cards_, vetoer_, votingPeriod_, votingDelay_, proposalThresholdBPS_, quorumVotesBPS_);

        admin = admin_;
    }

    function initialize(
        address timelock_,
        address cards_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'SportsManagerDAO::initialize: admin only');
        require(address(timelock) == address(0), 'SportsManagerDAO::initialize: can only initialize once');

        timelock = ISportsManagerDAOExecutor(timelock_);
        cards = SportsManagerTokenLike(cards_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
