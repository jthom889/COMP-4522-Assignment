"use strict";

let allMembers = []; // Store all members globally
let unpaidMembers = []; // Store unpaid members separately
const itemsPerPage = 5;
const allMembersTableContainer = document.getElementById('all-members-container');
const unpaidMembersTableContainer = document.getElementById('unpaid-members-container');
const allMembersTableBody = document.getElementById('members-table').querySelector('tbody');
const unpaidMembersTableBody = document.getElementById('members-due').querySelector('tbody');
const allMembersPaginationDiv = document.getElementById('pagination-members');
const unpaidMembersPaginationDiv = document.getElementById('pagination-dues');
const addMemberButton = document.getElementById('add-member-button');
const addMemberForm = document.getElementById('add-member-form');
const memberForm = document.getElementById('member-form');
const cancelAddButton = document.getElementById('cancel-add');
const updateMemberForm = document.getElementById('update-member-form');
const updateMemberFormFields = document.getElementById('update-member-form-fields');
const cancelUpdateButton = document.getElementById('cancel-update');

// Helper function to create table cells
function createTableCell(text) {
    const cell = document.createElement('td');
    cell.style.border = '1px solid white';
    cell.style.padding = '8px';
    cell.style.color = 'white';
    cell.textContent = text;
    return cell;
}

// Function to handle errors
function handleErrors(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// Function to fetch all members from the API
async function fetchMembers() {
    try {
        const response = await fetch('http://localhost:3000/api/members'); // GET /
        handleErrors(response);
        const members = await response.json();
        allMembers = members;
        unpaidMembers = members.filter(member => member.PaidDues === "FALSE" || member.PaidDues === false);
        displayMembers(1);
        displayUnpaidMembers(1);
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('members-list').innerHTML = '<p style="color: white;">Failed to fetch members.</p>';
    }
}

// Function to display members in the "All Members" table with pagination
window.displayMembers = function(page) {
    allMembersTableBody.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageMembers = allMembers.slice(startIndex, endIndex);

    if (pageMembers.length > 0) {
        pageMembers.forEach(member => {
            const row = document.createElement('tr');
            row.id = `member-${member.MemberID}`;

            row.appendChild(createTableCell(member.FirstName + ' ' + member.LastName));
            row.appendChild(createTableCell(member.Email));
            row.appendChild(createTableCell(member.MemberID));
            row.appendChild(createTableCell(member.Phone || ''));
            row.appendChild(createTableCell(member.Address || ''));
            row.appendChild(createTableCell(member.JoinDate || ''));
            row.appendChild(createTableCell(member.ActivityStatus || ''));

            // Create action buttons (Update, Delete)
            const actionsCell = document.createElement('td');
            actionsCell.style.border = '1px solid white';
            actionsCell.style.padding = '8px';
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.onclick = () => showUpdateMemberForm(member);
            updateButton.style.marginRight = '5px';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteMember(member.MemberID);
            actionsCell.appendChild(updateButton);
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            allMembersTableBody.appendChild(row);
        });
    } else {
        allMembersTableBody.innerHTML = '<tr><td colspan="9" style="color: white;">No members to display.</td></tr>';
    }

    const pageCount = Math.ceil(allMembers.length / itemsPerPage);
    if (pageCount > 1) {
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displayMembers(${i})">${i}</button>`;
        }
        allMembersPaginationDiv.innerHTML = paginationLinks;
    } else {
        allMembersPaginationDiv.innerHTML = '';
    }
};

// Function to display members with unpaid dues in the "Unpaid Members" table with pagination
window.displayUnpaidMembers = function(page) {
    unpaidMembersTableBody.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageUnpaidMembers = unpaidMembers.slice(startIndex, endIndex);

    if (pageUnpaidMembers.length > 0) {
        pageUnpaidMembers.forEach(member => {
            const row = document.createElement('tr');
            row.id = `unpaid-member-${member.MemberID}`;

            row.appendChild(createTableCell(member.FirstName + ' ' + member.LastName));
            row.appendChild(createTableCell(member.Email));
            row.appendChild(createTableCell(member.MemberID));
            row.appendChild(createTableCell(member.Phone || ''));
            row.appendChild(createTableCell(member.Address || ''));
            row.appendChild(createTableCell(member.JoinDate || ''));
            row.appendChild(createTableCell(member.ActivityStatus || ''));

            // Create action buttons (Update, Delete)
            const actionsCell = document.createElement('td');
            actionsCell.style.border = '1px solid white';
            actionsCell.style.padding = '8px';
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.onclick = () => showUpdateMemberForm(member); // Use the same showUpdateMemberForm
            updateButton.style.marginRight = '5px';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteMember(member.MemberID); // Use the same deleteMember
            actionsCell.appendChild(updateButton);
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            unpaidMembersTableBody.appendChild(row);
        });
    } else {
        unpaidMembersTableBody.innerHTML = '<tr><td colspan="9" style="color: white;">No unpaid members to display.</td></tr>';
    }

    const pageCount = Math.ceil(unpaidMembers.length / itemsPerPage);
    if (pageCount > 1) {
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displayUnpaidMembers(${i})">${i}</button>`;
        }
        unpaidMembersPaginationDiv.innerHTML = paginationLinks;
    } else {
        unpaidMembersPaginationDiv.innerHTML = '';
    }
};

// Function to add a new member
async function addMember(member) {
    try {
        const response = await fetch('http://localhost:3000/api/members', { // POST /
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        });
        handleErrors(response);
        const newMember = await response.json();

        // **Crucial Change:** Update the newMember object with the ID from the server
        member.MemberID = newMember.id; // Assuming your server returns the new ID in 'id'

        allMembers.push(member); // Push the *original* member object, now with the server-generated ID
        unpaidMembers = allMembers.filter(m => m.PaidDues === "FALSE" || m.PaidDues === false);
        displayMembers(1);
        displayUnpaidMembers(1);
        hideAddMemberForm();
    } catch (error) {
        console.error('Error adding member:', error);
        alert('Failed to add member.');
    }
}

// Function to delete a member
async function deleteMember(memberId) {
    if (confirm('Are you sure you want to delete this member?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/members/${memberId}`, { // DELETE /:id
                method: 'DELETE'
            });
            handleErrors(response);
            if (response.status === 404) {
                alert('Member not found.');
                return;
            }
            allMembers = allMembers.filter(member => member.MemberID !== memberId);
            unpaidMembers = allMembers.filter(member => member.PaidDues === "FALSE" || member.PaidDues === false);
            displayMembers(1);
            displayUnpaidMembers(1);
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to delete member.');
        }
    }
}

// Function to update a member
async function updateMember(member) {
    try {
        const response = await fetch(`http://localhost:3000/api/members/${member.MemberID}`, { // PUT /:id
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        });
        handleErrors(response);
        if (response.status === 404) {
            alert('Member not found.');
            return;
        }
        const updatedMember = await response.json();
        allMembers = allMembers.map(m => (m.MemberID === member.MemberID ? updatedMember : m));
        unpaidMembers = allMembers.filter(m => m.PaidDues === "FALSE" || m.PaidDues === false);
        displayMembers(1);
        displayUnpaidMembers(1);
        hideUpdateMemberForm();
    } catch (error) {
        console.error('Error updating member:', error);
        alert('Failed to update member.');
    }
}

// Function to show the add member form
function showAddMemberForm() {
    addMemberForm.style.display = 'block';
}

// Function to hide the add member form
function hideAddMemberForm() {
    addMemberForm.style.display = 'none';
}

// Function to show the update member form
function showUpdateMemberForm(member) {
    updateMemberForm.style.display = 'block';
    // Populate the form with member data
    document.getElementById('update-memberId').value = member.MemberID;
    document.getElementById('update-firstName').value = member.FirstName;
    document.getElementById('update-lastName').value = member.LastName;
    document.getElementById('update-email').value = member.Email;
    document.getElementById('update-phone').value = member.Phone || '';
    document.getElementById('update-address').value = member.Address || '';
    document.getElementById('update-joinDate').value = member.JoinDate || '';
    document.getElementById('update-activityStatus').value = member.ActivityStatus || '';
    document.getElementById('update-paidDues').checked = member.PaidDues === "TRUE" || member.PaidDues === true;
}

// Function to hide the update member form
function hideUpdateMemberForm() {
    updateMemberForm.style.display = 'none';
}

// Function to validate form data
function validateMemberForm(memberData) {
    const errors = [];
    if (!memberData.FirstName) errors.push('First Name is required.');
    if (!memberData.LastName) errors.push('Last Name is required.');
    if (!memberData.Email) errors.push('Email is required.');
    // Add more validation rules as needed
    return errors;
}

// Event listeners
addMemberButton.addEventListener('click', showAddMemberForm);
cancelAddButton.addEventListener('click', hideAddMemberForm);
cancelUpdateButton.addEventListener('click', hideUpdateMemberForm);

memberForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const joinDate = document.getElementById('joinDate').value;
    const activityStatus = document.getElementById('activityStatus').value;
    const paidDues = document.getElementById('paidDues').checked; // Get boolean value

    const newMember = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Address: address,
        JoinDate: joinDate,
        ActivityStatus: activityStatus,
        PaidDues: paidDues
    };

    const errors = validateMemberForm(newMember);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    addMember(newMember);
});

updateMemberFormFields.addEventListener('submit', function(event) {
    event.preventDefault();
    const memberId = document.getElementById('update-memberId').value;
    const firstName = document.getElementById('update-firstName').value;
    const lastName = document.getElementById('update-lastName').value;
    const email = document.getElementById('update-email').value;
    const phone = document.getElementById('update-phone').value;
    const address = document.getElementById('update-address').value;
    const joinDate = document.getElementById('update-joinDate').value;
    const activityStatus = document.getElementById('update-activityStatus').value;
    const paidDues = document.getElementById('update-paidDues').checked; // Get boolean value

    const updatedMember = {
        MemberID: parseInt(memberId, 10),
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Address: address,
        JoinDate: joinDate,
        ActivityStatus: activityStatus,
        PaidDues: paidDues
    };

    const errors = validateMemberForm(updatedMember);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    updateMember(updatedMember);
});

// Initial fetch
fetchMembers();