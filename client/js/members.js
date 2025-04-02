let allMembers = []; // Store the fetched members globally

async function fetchMembers() {
    try {
        const response = await fetch('http://localhost:3000/api/members');
        const members = await response.json();
        allMembers = members; // Store the fetched members
        displayMembers(1); // Display the first page
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('members-list').innerHTML = '<p style="color: white;">Failed to fetch members.</p>';
    }
}

// Make displayMembers globally accessible
window.displayMembers = function(page) {
    const tableBody = document.getElementById('members-table').querySelector('tbody');
    const paginationDiv = document.getElementById('pagination');
    const itemsPerPage = 5; // Adjust as needed
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

    // Pagination links
    const pageCount = Math.ceil(allMembers.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayMembers(${i})">${i}</button>`;
    }
    paginationDiv.innerHTML = paginationLinks;
};

fetchMembers();