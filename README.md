# Bus Ticket Booking Smart Contract

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a Solidity smart contract that simulates a bus ticket booking system on the Ethereum blockchain.

## Contract Details

- **Contract Address:** [0x5FbDB2315678afecb367f032d93F642f64180aa3]
- **Solidity Version:** ^0.8.0
- **License:** [MIT License](https://opensource.org/licenses/MIT)

## Features

- Allows passengers to book seats on a bus.
- Tracks available seats, booked seats, and pricing.
- Supports withdrawing contract funds by the owner.

## Usage

1. **Prerequisites:**
   - Install an Ethereum development environment (e.g., Remix, Hardhat, Truffle).
   - Familiarity with smart contract development and deployment.

2. **Deployment:**
   - Deploy the smart contract using your chosen development environment.
   - Note down the deployed contract address.

3. **Interacting with the Contract:**
   - Use the functions provided by the smart contract to book seats, check availability, and withdraw funds.

## Functions

- `bookSeat(uint256 _seatNumber) external payable`
  Allows passengers to book a seat by specifying the seat number. Requires payment.

- `getBookingDetails(address _passenger) external view returns (uint256 seatNumber)`
  Returns the seat number booked by a specific passenger.

- `checkAvailability() external view returns (uint256)`
  Returns the number of available seats.

- `withdrawFunds() external onlyOwner`
  Allows the contract owner to withdraw contract funds.

## License

This smart contract is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

## Author

### Aryan Singh

- GitHub:([aryansingh186](https://github.com/aryansingh186))

For any inquiries, feel free to contact me at [22BCS80186@cuchd.in](mailto:your@email.com).
