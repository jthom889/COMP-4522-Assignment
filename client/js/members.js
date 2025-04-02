async function fetchMembers() {
    try {
        const response = await fetch('http://localhost:3000/api/members'); // Replace with your API endpoint
        const members = await response.json();

        const membersListDiv = document.getElementById('members-list');

        if (Array.isArray(members)) {
            members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.innerHTML = `
                    <p><strong>Name:</strong> ${member.FirstName}</p>
                    <p><strong>Email:</strong> ${member.Email}</p>
                    <p><strong>ID:</strong> ${member.MemberID}</p>
                    <p><strong>Phone:</strong> ${member.Phone}</p>
                    <p><strong>Address:</strong> ${member.Address}</p>
                    <p><strong>Join Date:</strong> ${member.JoinDate}</p>
                    <p><strong>Activity Status:</strong> ${member.ActivityStatus}</p>
                    <hr>
                `;
                membersListDiv.appendChild(memberDiv);
            });
        } else {
            membersListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('members-list').innerHTML = '<p>Failed to fetch members.</p>';
    }
}

fetchMembers();