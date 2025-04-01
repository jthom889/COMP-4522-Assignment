async function fetchPatrons() {
    try {
        const response = await fetch('http://localhost:3000/api/patron'); // Replace with your API endpoint
        const patrons = await response.json();

        const patronsListDiv = document.getElementById('patrons-list');

        if (Array.isArray(patrons)) {
            patrons.forEach(patron => {
                const patronDiv = document.createElement('div');
                patronDiv.innerHTML = `
                    <p><strong>PatronID:</strong> ${patron.PatronID}</p>
                    <p><strong>First Name:</strong> ${patron.FirstName}</p>
                    <p><strong>Last Name:</strong> ${patron.LastName}</p>
                    <p><strong>Email:</strong> ${patron.Email}</p>
                    <p><strong>Phone Number:</strong> ${patron.PhoneNumber}</p>
                    <p><strong>Address:</strong> ${patron.Address}</p>
                    <p><strong>Subscription:</strong> ${patron.Subscription}</p>
                    
                    <hr>
                `;
                patronsListDiv.appendChild(patronDiv);
            });
        } else {
            patronsListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

    } catch (error) {
        console.error('Error fetching patrons:', error);
        document.getElementById('patrons-list').innerHTML = '<p>Failed to fetch patrons.</p>';
    }
}

fetchPatrons();