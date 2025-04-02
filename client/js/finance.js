async function fetchFinance() {
    try {
        const response = await fetch('http://localhost:3000/api/income'); 
        const expenseResp = await fetch('http://localhost:3000/api/expenses');

        const incomes = await response.json();
        const expenses = await expenseResp.json();

        const incomesListDiv = document.getElementById('income-list');
        const expensesListDiv = document.getElementById('expenses-list');

        // Income display
        if (Array.isArray(incomes)) {
            incomes.forEach(income => {
                const incomeDiv = document.createElement('div');
                incomeDiv.innerHTML = `
                    <p><strong>Name:</strong> ${income.IncomeID}</p>
                    <p><strong>Source:</strong> ${income.Source}</p>
                    <p><strong>Amount:</strong> ${income.Date}</p>
                    <p><strong>Date:</strong> ${income.Date}</p>
                    <p><strong>SponsorID:</strong> ${income.SponsorID}</p>
                    <p><strong>TicketID:</strong> ${income.TicketID}</p>
                    <p><strong>AdvertiserID:</strong> ${income.AdvertiserID}</p>
                    <p><strong>SubID:</strong> ${income.SubID}</p>
                    
                    <hr>
                `;
                incomesListDiv.appendChild(incomeDiv);
            });
        } else {
            incomesListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

        // Expense display
        if (Array.isArray(expenses)) {
            expenses.forEach(expense => {
                const expensesDiv = document.createElement('div');
                expensesDiv.innerHTML = `
                    <p><strong>ExpenseID:</strong> ${expense.ExpenseID}</p>
                    <p><strong>ProductionID:</strong> ${expense.ProductionID}</p>
                    <p><strong>Description:</strong> ${expense.Description}</p>
                    <p><strong>Cost:</strong> ${expense.Cost}</p>
                    <p><strong>Date:</strong> ${expense.Date}</p>
                    
                    <hr>
                `;
                expensesListDiv.appendChild(expensesDiv);
            });
        } else {
            expensesListDiv.innerHTML = "<p>Error: data returned was not an array.</p>";
        }

    } catch (error) {
        console.error('Error fetching income or expenses:', error);
        document.getElementById('income-list').innerHTML = '<p>Failed to fetch income or expenses.</p>';
    }
}

fetchFinance();