// =========================
// ATM System 
// =========================

var username;
var correct_pass = /^[0-9]{4}$/; // Regex for a 4-digit PIN
var passTry = 3;
var currentBalance = 10000;
var currentOperation = ""; // "deposit" or "withdrawal"

// =========================
// User Authentication
// =========================

function AtmUsername() {
  username = document.getElementById("username").value.trim();
  if (username !== "") {
    document.getElementById("username-section").classList.add("hidden");
    document.getElementById("pin-section").classList.remove("hidden");
  } else {
    alert("Name cannot be empty.");
  }
}

function AtmPassword() {
  var pinInput = document.getElementById("pin").value.trim();
  if (correct_pass.test(pinInput)) {
    document.getElementById("pin-section").classList.add("hidden");
    document.getElementById("account-section").classList.remove("hidden");
    document.getElementById("balance-display").textContent = "Current Balance: £" + currentBalance;
  } else {
    passTry--;
    if (passTry === 0) {
      alert("Max number of attempts reached. Contact bank support.");
      document.getElementById("pin").disabled = true;
    } else {
      document.getElementById("pin-attempts").textContent = "Incorrect PIN. " + passTry + " tries left.";
    }
  }
}

// =========================
// ATM Functions
// =========================

function inquiry() {
  alert("Your current balance is £" + currentBalance);
  document.getElementById("balance-display").textContent = "Current Balance: £" + currentBalance;
}

function deposit() {
  currentOperation = "deposit";
  document.getElementById("transaction-amount").value = "";
  document.getElementById("transaction-section").classList.remove("hidden");
}

function withdrawal() {
  currentOperation = "withdrawal";
  document.getElementById("transaction-amount").value = "";
  document.getElementById("transaction-section").classList.remove("hidden");
}

function confirmTransaction() {
  var amount = parseInt(document.getElementById("transaction-amount").value, 10);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  
  if (currentOperation === "deposit") {
    currentBalance += amount;
    alert("You have successfully deposited £" + amount + 
          ".\nYour new balance is £" + currentBalance);
  } else if (currentOperation === "withdrawal") {
    if (amount < 1000) {
      alert("Invalid input. Minimum withdrawal is £1000.");
      return;
    }
    if (amount <= currentBalance) {
      currentBalance -= amount;
      alert("Transaction successful!\nYour remaining balance is £" + currentBalance);
    } else {
      alert("Insufficient funds!");
      return;
    }
  }
  
  document.getElementById("transaction-section").classList.add("hidden");
  document.getElementById("balance-display").textContent = "Current Balance: £" + currentBalance;
}

function exitATM() {
  alert("Thank you for using our ATM!");
  resetATM();
}

function resetATM() {
  username = "";
  passTry = 3;
  currentBalance = 10000;
  currentOperation = "";
  
  document.getElementById("username-section").classList.remove("hidden");
  document.getElementById("pin-section").classList.add("hidden");
  document.getElementById("account-section").classList.add("hidden");
  document.getElementById("transaction-section").classList.add("hidden");
  document.getElementById("username").value = "";
  document.getElementById("pin").value = "";
  document.getElementById("pin-attempts").textContent = "";
  document.getElementById("balance-display").textContent = "";
}
