let allMembers = []; // Store the fetched members globally
let unpaidMembers = []; // Store unpaid members separately

async function fetchMembers() {
    try {
        const response = await fetch('http://localhost:3000/api/members');
        const members = await response.json();
        allMembers = members; // Store all members
        unpaidMembers = members.filter(member => member.PaidDues === "FALSE" || member.PaidDues === false); // Store only unpaid members

        console.log("All Members:", allMembers); // Debugging
        console.log("Unpaid Members:", unpaidMembers); // Debugging

        displayMembers(1);
        displayUnpaidMembers(1);
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('members-list').innerHTML = '<p style="color: white;">Failed to fetch members.</p>';
    }
}

// Display paginated members
window.displayMembers = function (page) {
    const tableBody = document.getElementById('members-table').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination-members');

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageMembers = allMembers.slice(startIndex, endIndex);

    tableBody.innerHTML = ''; // Clear previous table data

    if (pageMembers.length > 0) {
        pageMembers.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.FirstName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Email}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.MemberID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Phone}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Address}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.JoinDate}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.ActivityStatus}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="7" style="color: white;">No members to display.</td></tr>';
    }

    // Pagination links for all members
    const pageCount = Math.ceil(allMembers.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayMembers(${i})">${i}</button>`;
    }
    paginationDiv.innerHTML = paginationLinks;
};

// Display paginated unpaid members
window.displayUnpaidMembers = function (page) {
    const unpaidDuesTable = document.getElementById('members-due').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination-dues');

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageUnpaidMembers = unpaidMembers.slice(startIndex, endIndex);

    unpaidDuesTable.innerHTML = ''; // Clear previous unpaid dues table data

    if (pageUnpaidMembers.length > 0) {
        pageUnpaidMembers.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.FirstName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Email}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.MemberID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Phone}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Address}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.JoinDate}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.ActivityStatus}</td>
            `;
            unpaidDuesTable.appendChild(row);
        });
    } else {
        unpaidDuesTable.innerHTML = '<tr><td colspan="7" style="color: white;">No unpaid members to display.</td></tr>';
    }

    // Pagination links for unpaid members
    const pageCount = Math.ceil(unpaidMembers.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayUnpaidMembers(${i})">${i}</button>`;
    }
    paginationDiv.innerHTML = paginationLinks;
};

fetchMembers();
