let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

if (expenses.length === 0) {
    expenses = [
        { name: "Rent", amount: 15000 },
        { name: "Water", amount: 500 }
    ];
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateUI() {
    const tableBody = document.getElementById("expenseList");
    tableBody.innerHTML = "";

    expenses.forEach((exp, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${exp.name}</td>
                <td>₹${exp.amount.toFixed(2)}</td>
                <td><button class="delete-btn" onclick="deleteExpense(${i})">✖</button></td>
            `;
        tableBody.appendChild(row);
    });

    let total = expenses.reduce((t, e) => t + e.amount, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2);

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
    let name = document.getElementById("expenseName").value.trim();
    let amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || isNaN(amount)) {
        alert("Enter valid details!");
        return;
    }

    expenses.push({ name, amount });
    updateUI();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(i) {
    expenses.splice(i, 1);
    updateUI();
}

function clearAll() {
    expenses = [];
    updateUI();
}

updateUI();