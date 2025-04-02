let allSponsors = [];

async function fetchSponsors() {
    try {
        const response = await fetch('http://localhost:3000/api/sponsor'); // Replace with your API endpoint
        const sponsors = await response.json();

        allSponsors = sponsors;
        displaySponsors(1);
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        document.getElementById('sponsor-list').innerHTML = '<p style="color: white;">Failed to fetch sponsors.</p>';
    }
}

window.displaySponsors = function(page) {
    const tableBody = document.getElementById('sponsor-table').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination');
    const itemsPerPage = 5; // Adjust as needed
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageSponsors = allSponsors.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageSponsors.length > 0) {
        pageSponsors.forEach(sponsor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${sponsor.SponsorName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${sponsor.SponsorID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${sponsor.Email}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${sponsor.Phone}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="color: white;">No sponsors to display.</td></tr>';
    }

    const pageCount = Math.ceil(allSponsors.length / itemsPerPage);
    if (pageCount > 1) {
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displaySponsors(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = paginationLinks;
    } else {
        paginationDiv.innerHTML = '';
    }

    const rowHeight = 40; // Adjust as needed
    const headerHeight = 40; // Adjust as needed
    document.getElementById('table-container').style.height = (itemsPerPage * rowHeight + headerHeight + 60) + 'px';
};

fetchSponsors();