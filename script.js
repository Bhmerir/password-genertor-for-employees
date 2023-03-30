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
var haveUppercaseChar;
var haveLowercaseChar;
var haveNumericChar;
var haveSpecialChar;

//This variable keeps the number of the requested criteria by user, it sets 0 because user hasn't chosen any yet
var criteriaNo;

//This are the list of the characters that the password can consist of
var uppercaseChars = ["A","B", "C", "D", "E", "F", "G", "H","I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercaseChars = ["a","c", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numericChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialChars = ["!", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]","^", "_", "{", "|", "}", "~"];

//This list keep the chosen characters
var chosenList;

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
  haveUppercaseChar = false;
  haveLowercaseChar = false;
  haveNumericChar = false;
  haveSpecialChar = false;
  criteriaNo = 0;
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
  //If any type is not selected, we alert user to select at least one of them and recall the function
  if (criteriaNo == 0){
    alert("You have to select at least one character type.")
    askCriteria();
  }
}

//
function selectAndAddChosenChars(charList, charNo){
  //Random select of characters from eachlist and add it to chosen list
  var selectedChar;
  var selectedWord = "";
  var selectedIndex;
  for (i = 0; i < charNo; i++){
    selectedIndex = Math.floor(Math.random() * charNo);
    selectedChar = charList[selectedIndex];
    selectedWord = selectedWord + selectedChar;
    console.log(selectedWord);
    chosenList.push(selectedChar);
  }
  chosenList.forEach(element => console.log(element));
}

var remainingChar = characterNo;
var listNo = 0;
//var
function chooseRandomCharforEachList(){
  //This is our base criteria for this recursive approach
  var remainingChar = characterNo;
 /* console.log(criteriaNo);
  console.log(remainingChar);*/
  if(criteriaNo == 1){
    if(haveUppercaseChar){
      selectAndAddChosenChars(uppercaseChars, remainingChar);
      haveUppercaseChar = false;
    }
    else if(haveLowercaseChar){
      selectAndAddChosenChars(lowercaseChars, remainingChar);
      haveLowercaseChar = false;
    }
    else if(haveNumericChar){
      selectAndAddChosenChars(numericChars, remainingChar);
      haveNumericChar = false;
    }
    else{
      selectAndAddChosenChars(specialChars, remainingChar);
      haveSpecialChar = false;
    }
  }

}


//This function generates the password
function generatePassword(){
  chosenList = [];
   //Ask for character numbers
   askCharactorNumber();
   //Ask for criteria
   askCriteria();
   /*Choose a random number of selected characters from each list 
   considering the length of the requested password and criteria*/
   chooseRandomCharforEachList();
}

