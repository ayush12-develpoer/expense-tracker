const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateList() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <span class="delete" onclick="deleteExpense(${index})">❌</span>
    `;
    expenseList.appendChild(li);
  });

  totalDisplay.innerText = total;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateList();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (title && amount) {
    expenses.push({ title, amount });
    titleInput.value = '';
    amountInput.value = '';
    updateList();
  }
});

updateList(); // Load on startup
