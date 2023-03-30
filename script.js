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
var characterNo = 0;

/*The global of variables of below keeps if the password should have that criteria or not.
 false: not having that critria , true: having that criteria*/
var haveUppercaseChar = false;
var haveLowercaseChar = false;
var haveNumericChar = false;
var haveSpecialChar = false;

//This variable keeps the number of the requested criteria by user, it sets 0 because user hasn't chosen any yet
var criteriaNo = 0;

//This are the list of the characters that the password can consist of
var uppercaseChars = ["A","B", "C", "D", "E", "F", "G", "H","I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercaseChars = ["a","c", "c", "d", "e", "f", "g", "h","i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numericChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var specialChars = ["!", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]","^", "_", "{", "|", "}", "~"];

//This list keep the chosen characters
var chosenList = [];

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
  var selectedIndex = 0;
  var selectedChar = "";
  for (i = 0; i < charNo; i++){
    selectedIndex = Math.floor(Math.random() * charList.length);
    selectedChar = charList[selectedIndex];
    chosenList.push(selectedChar);
  }
}


var listNo = 0;
/*Choose a random number of selected characters from each list 
  considering the length of the requested password and criteria*/
function chooseRandomCharforEachList(){
  var remainingChars = characterNo - chosenList.length;
  /*This is our base criteria for this recursive approach, and it says that
  if we have only one criteria, all remaining characters must be chosen from its elevent list*/
  if(criteriaNo == 1){
    if(haveUppercaseChar){
      selectAndAddChosenChars(uppercaseChars, remainingChars);
      haveUppercaseChar = false;
      return;
    }
    else if(haveLowercaseChar){
      selectAndAddChosenChars(lowercaseChars, remainingChars);
      haveLowercaseChar = false;
      return;
    }
    else if(haveNumericChar){
      selectAndAddChosenChars(numericChars, remainingChars);
      haveNumericChar = false;
      return;
    }
    else{
      selectAndAddChosenChars(specialChars, remainingChars);
      haveSpecialChar = false;
      return;
    }
  }

  /*In order to have all requested criteria, the number of chosen character 
  from each list can't be more than half+1 characters of remaining characters*/
  listNo = Math.floor(Math.random() * (Math.floor(remainingChars * 0.5)+1));
  /*This while said that the random number can't be 0, 
  because we want to definitely have at least one character from each requested criteria*/
  while(listNo == 0){
    listNo = Math.floor(Math.random() * (Math.floor(remainingChars * 0.5)+1));
  }

  /*After randomly selecting the number of characters of each list, we call the function of selectAndAddChosenChars
  to choose random characters from one list then we reduce the number of criteria that have not considered yet and 
  recall this function again. This is the recursive part and each time only one of the criteria is considered*/ 
  if(haveUppercaseChar){
    selectAndAddChosenChars(uppercaseChars, listNo);
    haveUppercaseChar = false;
    criteriaNo--;
    remainingChars = remainingChars - listNo;
    chooseRandomCharforEachList();
  }
  else if(haveLowercaseChar){
    selectAndAddChosenChars(lowercaseChars, listNo);
    haveLowercaseChar = false;
    criteriaNo--;
    remainingChars = remainingChars - listNo;
    chooseRandomCharforEachList();
  }
  else if(haveNumericChar){
    selectAndAddChosenChars(numericChars, listNo);
    haveNumericChar = false;
    criteriaNo--;
    remainingChars = remainingChars - listNo;
    chooseRandomCharforEachList();
  }
  else{
    selectAndAddChosenChars(specialChars, listNo);
    haveSpecialChar = false;
    criteriaNo--;
    remainingChars = remainingChars - listNo;
    chooseRandomCharforEachList();
  }

}


//This function generates the password
function generatePassword(){
  var listLen = chosenList.length;
  for(i=0; i < listLen; i++)
  {
    chosenList.pop();
  }
  //Ask for character numbers
  askCharactorNumber();
  //Ask for criteria
  askCriteria();
  /*This function chooses thae random number of characters that should be chosen from each list and
  then it calls another function which is responsible to choose random characters*/
  chooseRandomCharforEachList();
  //shuffle the chosen list to have a more random password

  //This part make a string from our chosen letters and return it to be shown to user
  chosenList.forEach(function(element){ 
          ourPassword = ourPassword + element});
  return(ourPassword);
}

