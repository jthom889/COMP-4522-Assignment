let allPatrons = [];

async function fetchPatrons() {
    try {
        const response = await fetch('http://localhost:3000/api/patron');
        const patrons = await response.json();
        allPatrons = patrons;
        displayPatrons(1);
    } catch (error) {
        console.error('Error fetching patrons:', error);
        document.getElementById('patrons-list').innerHTML = '<p style="color: white;">Failed to fetch patrons.</p>';
    }
}

window.displayPatrons = function(page) {
    const tableBody = document.getElementById('patrons-table').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination');
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagePatrons = allPatrons.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pagePatrons.length > 0) {
        pagePatrons.forEach(patron => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.PatronID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.FirstName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.LastName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.Email}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.PhoneNumber}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.Address}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${patron.Subscription}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white;">No patrons to display.</td></tr>';
    }

    const pageCount = Math.ceil(allPatrons.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayPatrons(${i})">${i}</button>`;
    }
    paginationDiv.innerHTML = paginationLinks;

    // Calculate and set table-container height (flexbox handles the rest)
    const rowHeight = 40;
    const headerHeight = 40;
    document.getElementById('table-container').style.height = (itemsPerPage * rowHeight + headerHeight + 60) + 'px'; //added 60px
};

fetchPatrons();