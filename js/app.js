document.addEventListener('DOMContentLoaded', () => {
    const serviceList = document.getElementById('service-list');
    const serviceSelect = document.getElementById('service');
    const bookingForm = document.getElementById('booking-form');

    // Fetch services from data.json
    fetch('js/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the fetched data
            
            // Rendering logic...
            data.services.forEach(service => {
                // Add service to list
                const li = document.createElement('li');
                li.textContent = service.name;
                serviceList.appendChild(li);

                // Add service to select options
                const option = document.createElement('option');
                option.value = service.id;
                option.textContent = service.name;
                serviceSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Handle form submission
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const appointment = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time')
        };

        // Simulate saving the appointment (since we cannot write to the JSON file directly)
        fetch('js/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.appointments.push(appointment);
                console.log('Appointments:', data.appointments);

                // This would normally be a POST request to a server to save the appointment
                alert('Appointment booked successfully!');
                bookingForm.reset();
            })
            .catch(error => console.error('Error booking appointment:', error));
    });
});
