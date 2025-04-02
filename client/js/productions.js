async function fetchProductions() {
    try {
        const response = await fetch('http://localhost:3000/api/play'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const plays = await response.json();
        const playListTableBody = document.querySelector("tbody");
        playListTableBody.innerHTML = ""; // Clear existing content

        if (Array.isArray(plays) && plays.length > 0) {
            plays.forEach(play => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="border: 1px solid white; padding: 8px; color: white;">${play.Title}</td>
                    <td style="border: 1px solid white; padding: 8px; color: white;">${play.Author}</td>
                    <td style="border: 1px solid white; padding: 8px; color: white;">${play.Genre}</td>
                    <td style="border: 1px solid white; padding: 8px; color: white;">${play.NumberOfActs}</td>
                    <td style="border: 1px solid white; padding: 8px; color: white;">${play.PlayID}</td>
                `;
                playListTableBody.appendChild(row);
            });
        } else {
            playListTableBody.innerHTML = "<tr><td colspan='5' style='text-align:center; color: white;'>No productions available.</td></tr>";
        }
        // Pagination links

    } catch (error) {
        console.error('Error fetching productions:', error);
        document.getElementById('production-list').innerHTML = '<p style="color: red;">Failed to fetch productions.</p>';
    }
}

document.addEventListener("DOMContentLoaded", fetchProductions);
fetchProductions()