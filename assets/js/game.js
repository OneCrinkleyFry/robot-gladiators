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



//fight function
var fight = function(enemy) {
    // Alert users that they are starting the round
    //checking if the user wants to fight
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");


    while (enemy.health > 0 && playerInfo.health > 0) {

        if (promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            window.alert(playerInfo.name + " has chosen to skip the fight!");
            var skipCost = 10;
            //confirm the user would like to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit? Cost: " + skipCost + " coins. You have " + playerInfo.money + " coins.");

            // if yes/true and they have enough coins, leaves the fight
            if (confirmSkip && playerInfo.money >= skipCost) {
                window.alert (playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - skipCost);
                //call a function to the shop.


                break;
                //check if user has enough money to skip
            } else if (confirmSkip && playerInfo.money < skipCost) {
                // alert them that they need more money
                window.alert("You do not have enough coins to skip this round! Try again!");
                fight(enemy.name);
                // if no, fight continues.
            } else {
                fight(enemy.name);
            }
        } 

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
        else {
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
    }
};


//start game function
var startGame = function() {
    //resetting the player health
    playerInfo.reset();

    // loop to get you to fight the robots until you or they are dead.
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch(shopOptionPrompt) {
        case "Refill":
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
        case "upgrade":
        case "Upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
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

//
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
};

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