let allCast = []; // Store all cast members globally
const itemsPerPage = 5; // Number of items per page

async function fetchProductions() {
    try {
        const response = await fetch('http://localhost:3000/api/members/cast'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        allCast = await response.json(); // Store fetched data
        displayCast(1); // Display first page

    } catch (error) {
        console.error('Error fetching productions:', error);
        document.getElementById('production-list').innerHTML = '<p style="color: red;">Failed to fetch productions.</p>';
    }
}

// Function to display paginated cast members
function displayCast(page) {
    const castTableBody = document.querySelector("tbody");
    const paginationDiv = document.getElementById("pagination");
    castTableBody.innerHTML = ""; // Clear existing content

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageCast = allCast.slice(startIndex, endIndex); // Get current page data

    if (pageCast.length > 0) {
        pageCast.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.FirstName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.LastName}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.Email}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${member.RoleTitle}</td>
            `;
            castTableBody.appendChild(row);
        });
    } else {
        castTableBody.innerHTML = "<tr><td colspan='4' style='text-align:center; color: white;'>No cast members available.</td></tr>";
    }

    // Pagination links
    const pageCount = Math.ceil(allCast.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayCast(${i})">${i}</button> `;
    }
    paginationDiv.innerHTML = paginationLinks;
}

// Load data on page load
document.addEventListener("DOMContentLoaded", fetchProductions);
