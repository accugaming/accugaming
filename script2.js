document.addEventListener("DOMContentLoaded", function() {
    // Now we can safely attach event listeners because the DOM is fully loaded

    // Maximum number of seats available
    const maxSeats = 50;
    let availableSeats = maxSeats;

    // Function to update the seat availability text on the page
    function updateSeatStatus() {
        const seatStatusText = document.getElementById('seat-status-text');
        if (availableSeats > 0) {
            seatStatusText.textContent = `Seats Available: ${availableSeats}`;
        } else {
            seatStatusText.textContent = 'Seats are full!';
            // Disable the registration button when seats are full
            document.querySelector('#registration-form button').disabled = true;
        }
    }

    // Handle form submission
    document.getElementById('registration-form') .addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting traditionally

        if (availableSeats > 0) {
            // Get form data
            const email = document.getElementById('email').value;
            const number = document.getElementById('number').value;
            const username = document.getElementById('username').value;
            const platform = document.getElementById('platform').value;


            // Simulate seat registration by decreasing the available seats
            availableSeats--;

            // Update the seat status after registration
            updateSeatStatus();

            // Show confirmation message
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.textContent = `Thank you for registering, ${name}! You will receive a confirmation email soon.`;

            // Optionally reset the form after submission
            document.getElementById('registration-form').reset();
        } else {
            // If the seats are full, show an error message
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.textContent = 'Sorry, the tournament is full. You cannot register at this time.';
            confirmationMessage.style.color = 'red';
        }
    });

    // Initial call to update seat status when the page loads
    updateSeatStatus();
});