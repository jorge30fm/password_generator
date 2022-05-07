
 //Variables below are strings that will be turned into arrays in order to randomly select charcters, that way I don't have to manually input each character in arrays
var lowerString = 'abcdefghijklmnopqrstuvwxyz';
var upperString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var numberString = '1234567890';
var specialCharString = '~!@#$%^&*()_+|}{":?><,./;[]=-';

var splitString = function(string) { //Function turns string to an array and returns that array
    var array = string.split('');
    return(array);
}
var passwordCriteria = {//this object stores all improtant information that will be referenced throughout the script

    passwordLength: '', //stores length of password as dictated by user input
    lowerCaseOptions: splitString(lowerString), //list of lower case letters to randomly choose from
    upperCaseOptions: splitString(upperString), //list of upper case letters to randomly choose from
    numbersOptions: splitString(numberString), //list of numbers to randomly choose from
    specialCharOptions: splitString(specialCharString), //list of special char to randomly select from
    finalPassword: '', //will store final password as a string
    includedCriteria: [] //will store which of the choices(lowercase, uppercase, etc) the user chose.
};
var randomInt = function(min, max) { //creates a random integer from a given range

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var arrayRandomIndex = function(array) { //select random index values in an array
    var random = array[Math.floor(Math.random() * array.length)];
    return random;
}
var confirmInput = function(criteria) { //validate user input function

    var confirmSelection = confirm(" Your password will have " + criteria + " characters. Select 'OK' to confirm or 'Cancel' to change your selection")
    return confirmSelection;
}
var getLength = function() { //get user input about password length, check if it is valid, add value to object property.
    var length = prompt("Let's determine your password's length. Please type a number from 8 to 128 ");
    if (length > 7 && length < 129){
       if(!confirmInput(length)) {
            getLength();
        }
        else {
            passwordCriteria.passwordLength = length;
            AddLowerCase();
        }
    }
    else {
        alert("The password length you selected is not valid. Please try again");
        getLength()
    };
};
var AddLowerCase = function() { //asks user if they want lower case letters
    var lowerCase = confirm("Would you like to include LOWERCASE characters?");
    if (!lowerCase) {
        var cancelConfirm = confirm('Are you sure you do not want lowercase letters?');
        if (!cancelConfirm) {
            AddLowerCase();
        }
        else {
            AddUpperCase();
        }
    }
    else {
        if (!confirmInput('lowercase')) {
            AddLowerCase();
        }
        else {
            passwordCriteria.includedCriteria.push(0); //stores info that user selected this criteria in array
            AddUpperCase();
        }
    }
};
var AddUpperCase = function() { //asks user if they want upper case letters
    var upperCase = confirm("Would you like to include UPPERCASE characters?");
    if (!upperCase) {
        var cancelConfirm = confirm('Are you sure you do not want uppercase letters?');
        if (!cancelConfirm) {
            AddUpperCase();
        }
        else {
            AddNumeric();
        }
    }
    else {
        if (!confirmInput('uppercase')) {
        AddUpperCase();
        }
        else {
            passwordCriteria.includedCriteria.push(1); //stores info that user selected this criteria in array
            AddNumeric();
        }
    };
}
var AddNumeric = function(){ //ask user if they want numbers
    var numeric = confirm("Would you like to include NUMBERS?");
    if (!numeric) {
        var cancelConfirm = confirm('Are you sure you do not want numbers?');
        if (!cancelConfirm) {
            AddNumeric();
        }
        else {
            AddSpecialChar();
        }
    }
    else {
        if (!confirmInput('numeric')) {
        AddNumeric();
        }
        else {
        passwordCriteria.includedCriteria.push(2); //stores info that user selected this criteria in array
        AddSpecialChar();
        }
    }
};
var AddSpecialChar = function () { //ask users if they want special characters
    var SpecialChar = confirm("Would you like to include SPECIAL CHARACTERS?");
    if (!SpecialChar) {
        var cancelConfirm = confirm('Are you sure you do not want special characters?');
        if (!cancelConfirm) {
            AddSpecialChar();
        }
        else {
            window.alert("You will not have special characters")
            passReq();
        }
    }
    else {
        if(!confirmInput('special character')) {
            AddSpecialChar();
        }
        else {
            passwordCriteria.includedCriteria.push(3); //stores info that user selected this criteria in array
        }
    }
};
var passReq = function() { //checks if at least one criteria was seletcted, if not, asks user to re-select criteria
    if (passwordCriteria.includedCriteria.length === 0) {
        window.alert('Sorry, you need to select at least one criteria for the password, please try again');
        AddLowerCase();
    }
}
var generatePassword = function() { //creates password based on user criteria
    var PassWord = [];
    count = 0;
    //will add characters to password until length reaches number specified by user
    while (count < passwordCriteria.passwordLength) {

        var interval = arrayRandomIndex(passwordCriteria.includedCriteria); //selects a random value from array of selected characters by the user. Value selected will represent the type of character that will go in thatposition
        switch (interval) { //checks which type of character was selected, and selects a random character from that list
            case 0:
               PassWord.push(passwordCriteria.lowerCaseOptions[randomInt(0, 25)]);
               break;
            case 1:
                 PassWord.push(passwordCriteria.upperCaseOptions[randomInt(0, 25)]);
                 break;
            case 2:
                PassWord.push(passwordCriteria.numbersOptions[randomInt(0, 9)]);
                break;
            case 3:
                PassWord.push(passwordCriteria.specialCharOptions[randomInt(0, 28)]);
                break
        }
        count++;
    }
    passwordCriteria.finalPassword = PassWord.join('');
    return passwordCriteria.finalPassword;
}


//_____________________________________________________________________________________________________
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    alert("Welcome to Password Generator, let's create your password!");
    alert("Your password can include lower and upper case letters, numbers, and special character. You must choose at least one of these choices. Click 'OK' to continue");
    getLength();
    var password = generatePassword();
    passwordCriteria.includedCriteria.length = 0; //resets array of included characters, so next time the user generates a password, his previous choices will not interfere
    var passwordText = document.querySelector("#password"); //need to add textContent to this element so that it gets displayed on screen.
    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
