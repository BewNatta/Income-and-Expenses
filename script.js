// ตัวแปรสำหรับเก็บข้อมูล
let transactions = [];

// อ้างอิง DOM
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");
const transactionsList = document.getElementById("transactions");

// ฟังก์ชันอัปเดตยอดรวม
function updateSummary() {
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  const balance = income - expense;

  incomeDisplay.textContent = income.toFixed(2);
  expenseDisplay.textContent = expense.toFixed(2);
  balanceDisplay.textContent = balance.toFixed(2);
}

// ฟังก์ชันเพิ่มรายการใน DOM
function addTransactionDOM(transaction) {
  const listItem = document.createElement("li");
  listItem.classList.add(transaction.amount > 0 ? "income" : "expense");
  listItem.innerHTML = `
    ${transaction.description}
    <span>${transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)} บาท</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;
  transactionsList.appendChild(listItem);
}

// ฟังก์ชันอัปเดตรายการ
function updateTransactions() {
  transactionsList.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateSummary();
}

// ฟังก์ชันลบรายการ
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateTransactions();
}

// ฟังก์ชันเพิ่มรายการใหม่
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = +amountInput.value;

  if (description === "" || isNaN(amount) || amount === 0) {
    alert("กรุณากรอกข้อมูลที่ถูกต้อง");
    return;
  }

  const transaction = {
    id: Date.now(), // ใช้ timestamp เป็น ID
    description,
    amount,
  };

  transactions.push(transaction);
  updateTransactions();

  // ล้างค่าในฟอร์ม
  descriptionInput.value = "";
  amountInput.value = "";
}

// Event Listener สำหรับฟอร์ม
expenseForm.addEventListener("submit", addTransaction);
