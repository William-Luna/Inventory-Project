/****
Usage: Validating input from Create/Edit Forms on the client-side before submission
****/

/**
    title: String, req
    category: String, req
    dateBought: Date, req
    cost: Number, req
    ifSold: Boolean, req
    dateSold: Date,
    return: Number,
    fees: Number
 */

const titleField = document.getElementById("title");
const categoryField = document.getElementById("category");
const dateBoughtField = document.getElementById("dateBought");
const costField = document.getElementById("cost");
const ifSoldTrueField = document.getElementById("ifSoldTrue");
const dateSoldField = document.getElementById("dateSold");
const returnField = document.getElementById("return");
const feesField = document.getElementById("fees");
const submit = document.getElementById("btn-submit");
const form = document.getElementById("form");


const titleError = document.getElementsByClassName("title-error")[0];
const categoryError = document.getElementsByClassName("category-error")[0];
const dateBoughtError = document.getElementsByClassName("dateBought-error")[0];
const costError = document.getElementsByClassName("cost-error")[0];
const ifSoldError = document.getElementsByClassName("ifSold-error")[0];
const dateSoldError = document.getElementsByClassName("dateSold-error")[0];
const returnError = document.getElementsByClassName("return-error")[0];
const feesError = document.getElementsByClassName("fees-error")[0];

const categories = ["Sneakers", "Electronics", "Cards", "Other"];

form.addEventListener("submit", function (e) {
    e.preventDefault(); //prevent submission for validation
    checkForm();
    

});

let errPrompt = {};

function checkForm() {
    //clear all error prompts first, if any, and clear any error-like appearances
    for (let key in errPrompt) {
        delete errPrompt[key];
    }

    titleError.classList.remove("border-red-400");
    categoryError.classList.remove("border-red-400");
    dateBoughtError.classList.remove("border-red-400");
    costError.classList.remove("border-red-400");
    ifSoldError.classList.remove("border-red-400");
    dateSoldError.classList.remove("border-red-400");
    returnError.classList.remove("border-red-400");
    feesError.classList.remove("border-red-400");

    //dateBought validation: Can only be today's date or a past date
    let today = new Date();
    let dateBoughtDate = new Date(dateBoughtField.value);
    if (dateBoughtDate.getUTCDate() > today.getDate()) { //different methods used in order to ignore local time zone
        errPrompt.dateBought = "Date cannot be in the future."
    }

    //validation: if ifSold is true, dateSold must be after dateBought (no unconfirmed preorders)
    let dateSoldDate = new Date(dateSoldField.value);
    if (ifSoldTrueField.checked) {
        if (dateSoldDate.getUTCDate() < dateBoughtDate.getUTCDate()) {
            errPrompt.dateSold = "Date sold must be after the bought date.";
        }
    } 

    //If errors exist, display errors. Else, submit form
    if (Object.keys(errPrompt).length > 0) {
        console.log("Form Validation Failed (Clientside)...");
        showErrors();
    } else {
        console.log("Form Validation Success (Clientside)...");
        form.submit();
    }

}

function showErrors() {
    if (errPrompt.dateBought) {
        dateBoughtField.classList.add("border-red-500");
        dateBoughtError.classList.add("block");
        dateBoughtError.innerHTML = errPrompt.dateBought;
        dateBoughtError.classList.add("block");
        dateBoughtError.classList.remove("hidden");
    }
    if (errPrompt.dateSold) {
        dateSoldField.classList.add("border-red-500");
        dateSoldError.classList.add("block");
        dateSoldError.innerHTML = errPrompt.dateSold;
        dateSoldError.classList.add("block");
        dateSoldError.classList.remove("hidden");
    }
}