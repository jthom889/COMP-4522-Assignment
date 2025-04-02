let allIncomes = [];
let allExpenses = [];

async function fetchFinance() {
    try {
        const response = await fetch('http://localhost:3000/api/income');
        const expenseResp = await fetch('http://localhost:3000/api/expenses');

        const incomes = await response.json();
        const expenses = await expenseResp.json();

        allIncomes = incomes;
        allExpenses = expenses;

        displayIncomes(1);
        displayExpenses(1);
    } catch (error) {
        console.error('Error fetching income or expenses:', error);
        document.getElementById('income-list').innerHTML = '<p style="color: white;">Failed to fetch income or expenses.</p>';
    }
}

window.displayIncomes = function(page) {
    const tableBody = document.getElementById('income-table').querySelector('tbody');
    const paginationDiv = document.getElementById('income-pagination');
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageIncomes = allIncomes.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageIncomes.length > 0) {
        pageIncomes.forEach(income => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.IncomeID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.Source}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.Amount}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.Date}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.SponsorID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.TicketID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.AdvertiserID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${income.SubID}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="8" style="color: white;">No incomes to display.</td></tr>';
    }

    const pageCount = Math.ceil(allIncomes.length / itemsPerPage);
    if (pageCount > 1) { // Only render pagination if more than one page
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displayIncomes(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = paginationLinks;
    } else {
        paginationDiv.innerHTML = ''; // Clear pagination if only one page
    }

    const rowHeight = 40;
    const headerHeight = 40;
    document.getElementById('income-table-container').style.height = (itemsPerPage * rowHeight + headerHeight + 60) + 'px';
};

window.displayExpenses = function(page) {
    const tableBody = document.getElementById('expenses-table').querySelector('tbody');
    const paginationDiv = document.getElementById('expenses-pagination');
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageExpenses = allExpenses.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageExpenses.length > 0) {
        pageExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="border: 1px solid white; padding: 8px; color: white;">${expense.ExpenseID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${expense.ProductionID}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${expense.Description}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${expense.Cost}</td>
                <td style="border: 1px solid white; padding: 8px; color: white;">${expense.Date}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="5" style="color: white;">No expenses to display.</td></tr>';
    }

    const pageCount = Math.ceil(allExpenses.length / itemsPerPage);
    if (pageCount > 1) { // Only render pagination if more than one page
        let paginationLinks = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationLinks += `<button onclick="displayExpenses(${i})">${i}</button>`;
        }
        paginationDiv.innerHTML = paginationLinks;
    } else {
        paginationDiv.innerHTML = ''; // Clear pagination if only one page
    }

    const rowHeight = 40;
    const headerHeight = 40;
    document.getElementById('expenses-table-container').style.height = (itemsPerPage * rowHeight + headerHeight + 60) + 'px';
};

fetchFinance();