// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//The global variable of characterNo ia available in all of functions
var characterNo;

//This function ask the user to enter the number of characters requested 
function askCharactorNumber(){
  var notAccepted = true;
  // This why will be executed until the user enters a valid number or click on cancel button
  while(notAccepted){
    characterNo = prompt("How many characters would you like your password to contain?");
    if (characterNo != null){
      characterNo = parseInt(characterNo);
      // Number.isInteger checks if the entered value is an integer or not. AS the user might enter for example an string or leave it empty which are unacceptable
      if (!Number.isInteger(characterNo)){
        alert ("You have to enter an integer number.");
      }
      else if (characterNo < 8){
        alert("Password length must be at least 8 characters.");
      }
      else if (characterNo > 128){
        alert("Password length must be less than 129 characters.");
      }
      else{
        //If the user enter an integer between 8 and 129, loop will be ended
        notAccepted = false;
      }
    }
    else{
       //If the user click cancel, loop will be ended
      notAccepted = false;
    }
  }
}

function generatePassword(){
   //This function generates the password
   askCharactorNumber();
}

