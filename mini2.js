let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    expenses.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
    ${item.name} - ₹${item.amount.toFixed(2)}
    <button class="delete-btn" onclick="deleteExpense(${index})">✖</button>
    `;
        list.appendChild(li);
    });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2);

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || isNaN(amount)) {
        alert("Please enter valid expense and amount!");
        return;
    }

    expenses.push({ name, amount });
    updateUI();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

updateUI();
