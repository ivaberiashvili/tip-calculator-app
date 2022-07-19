// ****INPUT FIELD****
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip-input");
const tipClick = document.querySelectorAll(".tip-click"); //click
const peopleInput = document.getElementById("people");

// ****OUTPUT FIELD****
const tipEachDisplay = document.getElementById("tip-display");
const totalEachDisplay = document.getElementById("total-display");

// ****RESET BUTTON****
const resetButton = document.getElementById("reset"); //click

// ***Bindings for Calculate Function***
let bill;
let people;
let percent;
let timeout;

// *function for resetting all tip buttons' styles from ".tip-click" class
function tipButtonStyleReset(){
    tipClick.forEach(btn => {  
        btn.style.backgroundColor = "var(--dark)";
        btn.style.color = "white"; 
    });
}
// *clears results' to $0.00 if not every input is filled
function ClearIfNotAllValues(){
    if(!bill || !percent || !people){
        tipEachDisplay.innerHTML = ("$0.00");
        totalEachDisplay.innerText = ("$0.00");
        return;
    } 
}
// *restricts only numbers in people input field.
function onlyNumberKey(event) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (event.which) ? event.which : event.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

//***BILL INPUT***
billInput.addEventListener('input', () => {
    // * replaces restricted characters with empty
    if(billInput.value == '' ){
        billInput.value = '';
    }
    // ** Self-action
    bill = billInput.value
    // ** Action/Interaction with other elements

    // * contolls tip buttons
    // && selectedButton.value
    if(!bill && !tipInput.value){ 
        selectedButton.style.backgroundColor = "var(--teal-light)";
        selectedButton.style.color = "var(--dark)";
    }else if(bill && people && tipInput.value == 0){
        selectedButton.style.backgroundColor = "var(--teal)";  
    }
    // ** prevents after restart to light tip button;
    ClearIfNotAllValues(); 
    // ** Calculator function
    tipCalculator ();      
});

//***SELECT TIP - CLICK***
let selectedButton;
tipClick.forEach(btn => {
    btn.addEventListener('click', (event) => {
        // ** Self-action
        percent = btn.value;
        
        tipButtonStyleReset();
        // * when it's clicked but rest of the inputs are not defined
        event.target.style.backgroundColor = "var(--teal-light)"; 
        event.target.style.color = "var(--dark)";
        
        selectedButton = event.target;
        // * when it's clicked AND rest of the inputs are also defined
        if(tipInput.value > 0){
            tipButtonStyleReset()
        }
        
        if(bill && people){
            event.target.style.backgroundColor = "var(--teal)";
            event.target.style.color = "var(--dark)";  
        }
        
        // ** Action/Interaction with other elements
        tipInput.value = '';//nullifies CUSTOM field when tip button is clicked
        // * clear calculations if any of input gets deteled    
        ClearIfNotAllValues();
        // ** Calculator function
        tipCalculator ();

    });
});


//***SELECT TIP - CUSTOM***
tipInput.addEventListener("click", () => {
    tipButtonStyleReset();
});// * resets button style

tipInput.addEventListener("input", () => {
    // * replaces restricted characters with empty
    if(tipInput.value == '' ){
        tipInput.value = '';
    }      
    // ** Self-action
    percent = tipInput.value;  
    if(tipInput.value > 0){
        tipButtonStyleReset()
    }
    // * clear calculations if any of input gets deteled
    ClearIfNotAllValues();
    // ** Calculator function
    tipCalculator ();      
});


//*** PEOPLE INPUT ***
peopleInput.addEventListener("input", () => {
    // ** Self-action
    people = peopleInput.value;

    // * if people number is 0 it gives notice, else it returns to normal state
    if(people == 0){
        document.getElementById('notice').style.display = "block";
        document.getElementById('people').style.border = "2px solid #E17052";
        tipEachDisplay.innerHTML = ("$0.00");
        totalEachDisplay.innerText = ("$0.00");
        // * contolls tip buttons
        if(tipInput.value > 0){
            tipButtonStyleReset()
        }else{
            selectedButton.style.backgroundColor = "var(--teal-light)";
            selectedButton.style.color = "var(--dark)";
        }
        return;
    }else{
        document.getElementById('notice').style.display = "none";
        document.getElementById('people').style.border = "2px solid #26C2AE";
    }
    // * contolls tip buttons
    if(bill && people && tipInput.value == 0 && selectedButton.value){
        selectedButton.style.backgroundColor = "var(--teal)";
    }
    // ** Action/Interaction with other elements
    ClearIfNotAllValues();
    // ** Calculator function
    tipCalculator ();  
});

function tipCalculator (){  
    // * change styles of elemens
    resetButton.style.backgroundColor = 'var(--teal)';
    // * stop calculating if any of input is missing
    if(!bill || !percent || !people){
        return;
    } 
    // ** CALCULATION ** 
    let tipEach = (bill * percent) / (100 * people);
    console.log("Tip Amount: " + tipEach);   
    let tipTotalNoDisplay = (bill * percent) / 100;
    let totalEach = (Number(bill) + Number(tipTotalNoDisplay)) / people; //რატომ მიბრუნებს სტრინგად არ ვიცი?!
    console.log("Total: " + totalEach);
    // *** Updates OUTPUT
    tipEachDisplay.innerHTML = ("$" + tipEach.toFixed(2));
    totalEachDisplay.innerHTML = ("$" + totalEach.toFixed(2));// რა განსხვავებაა?
}

resetButton.addEventListener('click', () => { 
    // ** Self-action
    resetButton.style.backgroundColor = 'var(--dark-dim)';
    resetButton.style.transition = '0.3s';
    // *** resets all input values and prints $0.00 on displays
    tipButtonStyleReset();
    billInput.value = '';
    tipClick.value = '';
    tipInput.value = '';
    peopleInput.value = '';

    if(selectedButton.value){
        selectedButton.value = '';
    }
    selectedButton = '';

    bill = 0;
    percent = 0;
    people = 0;
    tipEachDisplay.innerHTML = ("$0.00");
    totalEachDisplay.innerHTML = ("$0.00");
});






















































// ***********************************************************************************

// ამით დავიწყე

// let bill = 300;
// // პროცენტის ნიშანს მოხსნი ინფუთშივე
// let percent = 15; 
// let people = 4;

// function tipCalc(bill,percent,people){
//     let tip = (bill * percent) / 100 ;
//     let tipEach = (bill * percent) / (100 * people);
//     // console.log(tip); 
//     console.log(tipEach); 
//     let totalEach = (bill + tip) / people;
//     console.log(totalEach);
// }

// ***********************************************************************************
// **** START HERE ****