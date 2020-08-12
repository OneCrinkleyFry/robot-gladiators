//Game States
//"WIN" - Player robot has defeated all enemy robots
//      * fight all enemy robots
//      * Defeat each enemy robot
// "LOSE" - player robot's health is zero or less

//global variables

//functions
//shop Function
////prompt to receive an answer

//if 'refill' tell how much it costs, ask to confirm


//if 'upgrade' increase the playerInfo.attack var


/// if else or leave then exit shop

var fightOrSkip = function() {

    var promptFight = window.prompt("would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")
    promptFight = promptFight.toLowerCase();

    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.")
        return fightOrSkip();
    }

    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit? Cost: 10 coins.");
        if (confirmSkip && playerInfo.money >= 10) {
            window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
            playerInfo.money -= 10;
            shop();
            return true;
        }
    }

    return false;
}


//fight function
var fight = function(enemy) {
    // Alert users that they are starting the round
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    console.log(isPlayerTurn);

    while (enemy.health > 0 && playerInfo.health > 0) {
        if (fightOrSkip()){
            
            break;
        }
        if (isPlayerTurn) {
            var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
            //If the player chooses to fight, then fight
            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and that  result to update the value in the 'enemy.health' variable.
            enemy.health = Math.max(0, enemy.health-damage);
            //Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + " for " + damage + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            var damage = randomNumber(enemy.attack-10, enemy.attack);
            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and that  result to update the value in the 'playerInfo.health' variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);    
            //Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + " for " + damage + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        } else {
            var damage = randomNumber(enemy.attack-10, enemy.attack);
            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and that  result to update the value in the 'playerInfo.health' variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);    
            //Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + " for " + damage + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
                //If the player chooses to fight, then fight
                //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and that  result to update the value in the 'enemy.health' variable.
                enemy.health = Math.max(0, enemy.health-damage);
                //Log a resulting message to the console so we know that it worked.
                console.log(
                    playerInfo.name + " attacked " + enemy.name + " for " + damage + ". " + enemy.name + " now has " + enemy.health + " health remaining."
                );
                //check enemy's health
                if (enemy.health <= 0) {
                    window.alert(enemy.name + " has died!");
                    playerInfo.money = playerInfo.money + 20;
                    break;
                }
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};


//start game function
var startGame = function() {
    //resetting the player health
    playerInfo.reset();

    //loop to get you to fight the robots until you or they are dead.
    for (i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            window.alert("welcome to Robot Gladiators! Round " + (i + 1)); 

            var pickedEnemyObj = enemyInfo[i];


            
            //resets enemy health before each fight
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
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

//end game function
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    // Retrieve the current high score from localStorage
    var highscoreOwner = localStorage.getItem("name");
    var highScore = localStorage.getItem("score");
    console.log(highScore);
    // Compare the player robot score with the current high score
        // If the current high score is higher
    if (highScore === null) {

        highScore = 0;

    } else if (playerInfo.money > highScore) {
        localStorage.setItem("name", playerInfo.name);
        localStorage.setItem("score", playerInfo.money);
        window.alert("You beat the high score! the new high score is " + playerInfo.money + "!");

    }else {
        window.alert("You did not beat " + highscoreOwner + "'s high score of " + highScore + ".");
    }

    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have " + playerInfo.money + " coins.");
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
        playerInfo.health = 100;
        playerInfo.money = 10;
        playerInfo.attack = 10;
    }
}

//shop function
var shop = function () {

    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
        shopOptionPrompt = parseInt(shopOptionPrompt, 10);
    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

//
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var getPlayerName = function() {
    var name = "";
    var tempname;
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }

    tempname = name.toLowerCase();
    console.log(tempname);
    name = tempname[0].toUpperCase() + tempname.slice(1);

    window.alert("You're robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function ()
    {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 35 for 7 coins.");
            this.health += 35;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 2;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

var enemyInfo = [
    {
        name: "Roborto",
        attack:randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();
//confirm that they'd like to play again.