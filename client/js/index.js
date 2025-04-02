let allPlays = []; // Store all plays globally
const itemsPerPage = 5; // Number of items per page

async function fetchProductions() {
    try {
        const response = await fetch('http://localhost:3000/api/play'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        allPlays = await response.json(); // Store fetched data
        displayPlays(1); // Display first page

    } catch (error) {
        console.error('Error fetching productions:', error);
        document.getElementById('production-list').innerHTML = '<p style="color: red;">Failed to fetch productions.</p>';
    }
}

// Function to display paginated plays
function displayPlays(page) {
    const playTableBody = document.querySelector("tbody");
    const paginationDiv = document.getElementById("pagination");
    playTableBody.innerHTML = ""; // Clear existing content

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagePlays = allPlays.slice(startIndex, endIndex); // Get current page data

    if (pagePlays.length > 0) {
        pagePlays.forEach(play => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white; text-align: center;">${play.Title}</td>
                <td style="border: 1px solid white; padding: 8px; color: white; text-align: center;">${play.Author}</td>
                <td style="border: 1px solid white; padding: 8px; color: white; text-align: center;">${play.Genre}</td>
            `;
            playTableBody.appendChild(row);
        });
    } else {
        playTableBody.innerHTML = "<tr><td colspan='3' style='text-align:center; color: white;'>No productions available.</td></tr>";
    }

    // Pagination links
    const pageCount = Math.ceil(allPlays.length / itemsPerPage);
    let paginationLinks = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationLinks += `<button onclick="displayPlays(${i})">${i}</button> `;
    }
    paginationDiv.innerHTML = paginationLinks;
}

// Load data on page load
document.addEventListener("DOMContentLoaded", fetchProductions);
