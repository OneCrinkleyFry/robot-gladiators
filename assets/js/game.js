//Game States
//"WIN" - Player robot has defeated all enemy robots
//      * fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - player robot's health is zero or less

//global variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//functions

var fight = function(enemyName) {
    // Alert users that they are starting the round
    //checking if the user wants to fight
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");


    while (enemyHealth > 0 && playerHealth > 0) {

        if (promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            window.alert(playerName + " has chosen to skip the fight!");
            var skipCost = 10;
            //confirm the user would like to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit? Cost: " + skipCost + " coins. You have " + playerMoney + " coins.");

            // if yes/true and they have enough coins, leaves the fight
            if (confirmSkip && playerMoney >= skipCost) {
                window.alert (playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - skipCost;
                break;
                //check if user has enough money to skip
            } else if (confirmSkip && playerMoney < skipCost) {
                // alert them that they need more money
                window.alert("You do not have enough coins to skip this round! Try again!");
                fight(enemyName);
                // if no, fight continues.
            } else {
                fight(enemyName);
            }
        } 
        //If the player chooses to fight, then fight
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and that  result to update the value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        
        //check enemy's health
        if (enemyHealth <= 0) {
            enemyHealth = 0;
            window.alert(enemyName + " has died!");
            playerMoney = playerMoney + 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and that  result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        //check player's health
        if (playerHealth <= 0) {
            playerHealth = 0;
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

for (i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0){
        window.alert("welcome to Robot Gladiators! Round " + (i + 1)); 
        var pickedEnemyName = enemyNames[i];
        
        //resets enemy health before each fight
        enemyHealth = 50;
        fight(pickedEnemyName);
        
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}