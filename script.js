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

//The global variable which keep the requested number of characters
var characterNo;
/*The global of variables of below keeps if the password should have that criteria or not.
 false: not having that critria , true: having that criteria*/
var haveUppercaseChar = false;
var haveLowercaseChar = false;
var haveNumericChar = false;
var haveSpecialChar = false;
//This variable keeps the number of the requested criteria by user, it sets 0 because user hasn't chosen any yet
var criteriaNo = 0;

//This function ask the user to enter the number of characters requested 
function askCharactorNumber(){
  var notAccepted = true;
  // This why will be executed until the user enters a valid number or click on cancel button
  while(notAccepted){
    characterNo = prompt("How many characters would you like your password to contain?");
    if (characterNo != null){
      characterNo = parseInt(characterNo);
      /* Number.isInteger checks if the entered value is an integer or not.
       AS the user might enter for example an string or leave it empty which are unacceptable*/
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

//This function ask the user about the requested criteria 
function askCriteria(){
  /*This part ask user about the criteria which they request.If they press ok, 
  we set the relevant variable true and we add the citeriaNo by one*/
  if(confirm("Click OK to confirm including uppercase character.")){
    criteriaNo++;
    haveUppercaseChar = true;
  }
  if(confirm("Click OK to confirm including lowercase character.")){
    criteriaNo++;
    haveLowercaseChar = true;
  }  
  if(confirm("Click OK to confirm including numeric character.")){
    criteriaNo++;
    haveNumericChar = true;
  }
  if(confirm("Click OK to confirm including special character.")){
    criteriaNo++;
    haveSpecialChar = true;
  }
  //If any tyoe is not selected, we alert user to select at least one of them and recall the function
  if (criteriaNo == 0){
    alert("You have to select at least one character type.")
    askCriteria();
  }
}

//This function generates the password
function generatePassword(){
   //Ask for character numbers
   askCharactorNumber();
   //Ask for criteria
   askCriteria();
}

