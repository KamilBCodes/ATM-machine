// =========================
// ATM System
// =========================

// Global Variables
var username,
    correct_pass = /^[0-9]{4}$/, // Regex for a 4-digit PIN
    passTry = 3,
    currentBalance = 10000;

// =========================
// User Authentication
// =========================

function AtmUsername() {
    username = document.getElementById("username").value.trim();
    if (username !== "") {
        // Hide the username section and show the PIN section
        document.getElementById("username-section").classList.add("hidden");
        document.getElementById("pin-section").classList.remove("hidden");
    } else {
        alert("Name cannot be empty.");
    }
}

function AtmPassword() {
    var paswInput = prompt(username + ", Please enter a 4-digit PIN password");

    if (correct_pass.test(paswInput)) {
        selectAccountType();
    } else {
        passTry--;

        if (passTry === 0) {
            alert("Max number of attempts reached. Contact bank support.");
        } else {
            alert("Incorrect PIN. " + passTry + " tries left.");
            AtmPassword();
        }
    }
}

// =========================
// Account Selection
// =========================

function selectAccountType() {
    var accountType = parseInt(prompt(
        "Which type of account do you have? \n 1. Savings \n 2. Current \n 3. Credit"), 10);

    if (!isNaN(accountType) && accountType >= 1 && accountType <= 3) {
        selectFunction();
    } else {
        alert("Please make a valid selection.");
        selectAccountType();
    }
}

// =========================
// ATM Functions
// =========================

function selectFunction() {
    var atmFunction = parseInt(prompt(
        "Welcome " + username + ", please select an option: \n" +
        "1. Inquiry \n 2. Withdrawal \n 3. Deposit \n 4. Exit"), 10);

    switch (atmFunction) {
        case 1:
            inquiry();
            break;
        case 2:
            withdrawal();
            break;
        case 3:
            deposit();
            break;
        case 4:
            exit();
            break;
        default:
            alert("Please make a valid selection.");
            selectFunction();
    }
}

// =========================
// Inquiry
// =========================

function inquiry() {
    alert("Your current balance is £" + currentBalance);
    toContinue();
}

// =========================
// Deposit
// =========================

function deposit() {
    var depositAmount = parseInt(prompt("How much do you want to deposit?"), 10);

    if (!isNaN(depositAmount) && depositAmount > 0) {
        currentBalance += depositAmount;
        alert("You have successfully deposited £" + depositAmount + 
              ".\nYour new balance is £" + currentBalance);
    } else {
        alert("Error: Please enter a valid number.");
        deposit();
    }

    toContinue();
}

// =========================
// Withdrawal
// =========================

function withdrawal() {
    var withdrawalAmount = parseInt(prompt(
        "How much do you want to withdraw? (Minimum: £1000)"), 10);

    if (!isNaN(withdrawalAmount) && withdrawalAmount >= 1000) {
        if (withdrawalAmount <= currentBalance) {
            currentBalance -= withdrawalAmount;
            alert("Transaction successful!\nYour remaining balance is £" + currentBalance);
        } else {
            alert("Insufficient funds!");
        }
    } else {
        alert("Invalid input. Minimum withdrawal is £1000.");
        withdrawal();
    }

    toContinue();
}

// =========================
// Continue or Exit
// =========================

function toContinue() {
    var yesOrNo = parseInt(prompt("Do you want to perform another transaction? \n 1. Yes \n 2. No"), 10);

    if (yesOrNo === 1) {
        selectFunction();
    } else if (yesOrNo === 2) {
        exit();
    } else {
        alert("Invalid selection.");
        toContinue();
    }
}

function exit() {
    alert("Thank you for using our ATM!");
}
