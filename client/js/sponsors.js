async function fetchSponsors() {
    try {
        const response = await fetch('http://localhost:3000/api/sponsor'); // Replace with your API endpoint
        const sponsors = await response.json();

        const sponsorsListDiv = document.getElementById('sponsor-list');

        if (Array.isArray(sponsors)) {
            sponsors.forEach(sponsor => {
                const sponsorDiv = document.createElement('div');
                sponsorDiv.innerHTML = `
                    <p><strong>Sponsor Name:</strong> ${sponsor.SponsorName}</p>
                    <p><strong>SponsorID:</strong> ${sponsor.SponsorID}</p>
                    <p><strong>Email:</strong> ${sponsor.Email}</p>
                    <p><strong>Phone:</strong> ${sponsor.Phone}</p>
                    
                    <hr>
                `;
                sponsorsListDiv.appendChild(sponsorDiv);
            });
        } else {
            sponsorsListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

    } catch (error) {
        console.error('Error fetching sponsors:', error);
        document.getElementById('sponsor-list').innerHTML = '<p>Failed to fetch sponsors.</p>';
    }
}

fetchSponsors();