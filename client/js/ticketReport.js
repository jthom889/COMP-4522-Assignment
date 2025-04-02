let allTickets = [];

async function fetchTickets() {
    try {
        const response = await fetch('http://localhost:3000/api/ticket'); // Replace with your API endpoint
        const tickets = await response.json();

        allTickets = tickets;
        displayTickets(1); // Display the first page
    } catch (error) {
        console.error('Error fetching tickets:', error);
        document.getElementById('tickets-list').innerHTML = '<p style="color: white;">Failed to fetch tickets.</p>';
    }
}

window.displayTickets = function(page) {
    const tableBody = document.getElementById('tickets-table').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination');
    const itemsPerPage = 5; // Adjust as needed
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTickets = allTickets.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageTickets.length > 0) {
        pageTickets.forEach(ticket => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.TicketID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.ProductionID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.SeatID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.PatronID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.PurchaseDate}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.ShowDate}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${ticket.Price}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white;">No tickets to display.</td></tr>';
    }

    const pageCount = Math.ceil(allTickets.length / itemsPerPage);
    if (pageCount > 1) {
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displayTickets(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = paginationLinks;
    } else {
        paginationDiv.innerHTML = '';
    }

    const rowHeight = 40; // Adjust as needed
    const headerHeight = 40; // Adjust as needed
    document.getElementById('table-container').style.height = (itemsPerPage * rowHeight + headerHeight + 60) + 'px';
};

fetchTickets();