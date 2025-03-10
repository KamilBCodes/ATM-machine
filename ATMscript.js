var username,
    correct_pass = /^[0-9]{4}$/, // Regex for a 4-digit PIN
    passTry = 3,
    currentBalance = 10000;

// =========================
// Wait for DOM content to load
// =========================
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("proceed-button").addEventListener("click", AtmUsername);
    document.getElementById("submit-pin-button").addEventListener("click", AtmPassword);
    document.getElementById("savings-button").addEventListener("click", selectAccountType);
    document.getElementById("current-button").addEventListener("click", selectAccountType);
    document.getElementById("credit-button").addEventListener("click", selectAccountType);
    document.getElementById("check-balance-button").addEventListener("click", inquiry);
    document.getElementById("withdraw-button").addEventListener("click", withdrawal);
    document.getElementById("deposit-button").addEventListener("click", deposit);
    document.getElementById("exit-button").addEventListener("click", exitATM);
    document.getElementById("confirm-transaction-button").addEventListener("click", confirmTransaction);
});

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
    var paswInput = document.getElementById("pin").value.trim();

    if (correct_pass.test(paswInput)) {
        document.getElementById("pin-section").classList.add("hidden");
        document.getElementById("account-section").classList.remove("hidden");
    } else {
        passTry--;
        document.getElementById("pin-attempts").innerText = "Attempts left: " + passTry;

        if (passTry === 0) {
            alert("Max number of attempts reached. Contact bank support.");
        } else {
            alert("Incorrect PIN. " + passTry + " tries left.");
        }
    }
}

// =========================
// Account Selection
// =========================

function selectAccountType(event) {
    var accountType = event.target.id;
    document.getElementById("account-section").classList.add("hidden");
    document.getElementById("atm-functions-section").classList.remove("hidden");
}

// =========================
// ATM Functions
// =========================

function inquiry() {
    document.getElementById("balance-display").innerText = "Your current balance is £" + currentBalance;
    toContinue();
}

function deposit() {
    document.getElementById("transaction-section").classList.remove("hidden");
}

function withdrawal() {
    document.getElementById("transaction-section").classList.remove("hidden");
}

function confirmTransaction() {
    var transactionAmount = parseInt(document.getElementById("transaction-amount").value, 10);
    if (!isNaN(transactionAmount) && transactionAmount > 0) {
        if (transactionAmount <= currentBalance) {
            currentBalance -= transactionAmount;
            document.getElementById("balance-display").innerText = "Your remaining balance is £" + currentBalance;
        } else {
            alert("Insufficient funds!");
        }
    } else {
        alert("Please enter a valid amount.");
    }
    document.getElementById("transaction-section").classList.add("hidden");
    toContinue();
}

function toContinue() {
    document.getElementById("atm-functions-section").classList.remove("hidden");
}

function exitATM() {
    alert("Thank you for using our ATM!");
    document.getElementById("username-section").classList.remove("hidden");
    document.getElementById("pin-section").classList.add("hidden");
    document.getElementById("account-section").classList.add("hidden");
    document.getElementById("atm-functions-section").classList.add("hidden");
    document.getElementById("transaction-section").classList.add("hidden");
    document.getElementById("pin-attempts").innerText = "Attempts left: 3";
    passTry = 3;
    currentBalance = 10000;
}
