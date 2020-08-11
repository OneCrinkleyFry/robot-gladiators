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
//shop Function
////prompt to receive an answer

//if 'refill' tell how much it costs, ask to confirm


//if 'upgrade' increase the playerAttack var


/// if else or leave then exit shop



//fight function
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
                //call a function to the shop.


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

var startGame = function() {
    //resetting the player health
    playerHealth = 100;
    // I would reset the other two values, but I think that it would be more fun to keep them
    //I instead made it so that they cap out at a certain point.
    if (playerAttack > 20){
        playerAttack = 20;
    }
    if (playerMoney > 100){
        playerMoney = 100;
    }

    // loop to get you to fight the robots until you or they are dead.
    for (i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0){
            window.alert("welcome to Robot Gladiators! Round " + (i + 1)); 
            var pickedEnemyName = enemyNames[i];
            
            //resets enemy health before each fight
            enemyHealth = 50;
            fight(pickedEnemyName);
            if (i < enemyNames.length - 1 && playerHealth > 0) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm){
                    shop();
                }
            }
            
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have " + playerMoney + " coins.");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would You like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        playerHealth = 100;
        playerMoney = 10;
        playerAttack = 10;
    }
}

var shop = function () {

    var healthUpCost = 7;
    var healthUpAmmount = 20;
    var attackUpCost = 7;
    var attackUpAmmount = 2;

    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch(shopOptionPrompt) {
        case "Refill":
        case "refill":
        case "REFILL":
            if (playerMoney >= healthUpCost){
                window.alert("Refilling player's health by " + healthUpAmmount + " for " + healthUpCost + " coins.");
                playerHealth = playerHealth + healthUpAmmount;
                playerMoney = playerMoney - healthUpCost;
                
            }else {
                window.alert("You don't have enough money");
            }
            break;
        case "upgrade":
        case "Upgrade":
        case "UPGRADE":
            if (playerMoney >= attackUpCost) {
                window.alert("Upgrading player's attack by " + attackUpAmmount + " for " + attackUpCost + " coins.");
                playerAttack = playerAttack + attackUpAmmount;
                playerMoney = playerMoney - attackUpCost;
            }
            break;
        case "leave":
        case "Leave":
        case "LEAVE":
            window.alert("Leaving the store.");

            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

startGame();
//confirm that they'd like to play again.