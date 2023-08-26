// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BusTicketBooking {
    address public owner;
    uint256 public totalSeats;
    uint256 public availableSeats;
    uint256 public pricePerSeat;

    mapping(address => uint256) public bookedSeats;

    event SeatBooked(address indexed passenger, uint256 seatNumber);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(uint256 _totalSeats, uint256 _pricePerSeat) {
        owner = msg.sender;
        totalSeats = _totalSeats;
        availableSeats = _totalSeats;
        pricePerSeat = _pricePerSeat;
    }

    function bookSeat(uint256 _seatNumber) external payable {
        require(_seatNumber > 0 && _seatNumber <= totalSeats, "Invalid seat number");
        require(availableSeats > 0, "No available seats");
        require(bookedSeats[msg.sender] == 0, "You have already booked a seat");

        bookedSeats[msg.sender] = _seatNumber;
        availableSeats--;

        emit SeatBooked(msg.sender, _seatNumber);
    }

    function getBookingDetails(address _passenger) external view returns (uint256 seatNumber) {
        return bookedSeats[_passenger];
    }

    function checkAvailability() external view returns (uint256) {
        return availableSeats;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
