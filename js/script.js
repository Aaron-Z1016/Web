// semicolons分号
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];

// //1. const（常量）
// 作用：用于声明一个常量，其值一旦被赋予就不能更改。
// 特性：
// 必须在声明时初始化值（const x; 会报错）。
// 声明的变量是块级作用域。
// 虽然变量本身的引用不能更改，但如果它是一个对象或数组，其内容可以被修改。
// 2. let（块级变量）
// 作用：用于声明变量，值可以在程序运行中更改。
// 特性：
// 可以声明块级作用域的变量。
// 不会像 var 一样提升到函数或全局作用域。
// 在同一个块级作用域中，不能重复声明同名变量。

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const weapons = [{name:'stick', power : 5},
    {name: 'dagger', power: 30}, 
    {name: 'claw hammer', power:50},
    {name: 'sword', power: 100}];

const monsters = [{name: 'slime', level: 2, health: 15},
    {name: 'fanged beast', level: 8, health: 60},
    {name: 'dragon', level: 20, health: 300}];
    
// {} 是 对象字面量（Object Literal） 的语法，用于定义一个 JavaScript 对象。
// 对象是键值对（key-value pairs）的集合，用于存储关联数据和更复杂的实体。
const locations = [{
    name:'town square', 'button text':['Go to store', 'Go to cave', 'Fight dragon'],
    'button functions': [goStore, goCave, fightDragon],
    //backslash让他知道这不是end of string 而是literally
    text:'Your are in the town square. You see a sign that says \'Store.\''},{
    name:'store', 'button text':['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
    'button functions': [buyHealth, buyWeapon, goTown],
    text:'You enter the store.'},{
    name:'cave', 'button text':['Fight slime', 'Fight fanged beast', 'Go to town square'],
    'button functions': [fightSlime, fightBeast, goTown],
    text:'You enter the cave. You see some monsters'},{
    name:'fight', 'button text':['Attack', 'Dodge', 'Run'],
    'button functions':[attack, dodge, goTown]},{
    name: 'kill monster', 'button text': ['Go to town square', 'Go to town square', 'Easter egg'],
    'button functions': [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'},{
    name:'lose', 'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    text: 'You die. ☠️'},{
    name:'win', 'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    text: 'You defeat the dragon! YOU WIN THE GAME!🎉'},{
    name:'easter egg', 'button text':['2', '8', 'Go to town square'],
    'button functions': [pickTwo, pickEight, goTown],
    text: 'You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 - 10. If the number you choose matches one of the random numbers, you win!'
    }];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = 'none';
    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    text.innerText = location.text;

}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    // console.log('Going to cave.')
    update(locations[2]);
}


function buyHealth(){
    if(gold>=10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health; 
    } else{
        text.innerText = 'You do not have enough gold to buy health.';
    }

}

function buyWeapon(){
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            // 没有这个变量所以要声明用let
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = 'You now have a' + newWeapon + '.';
            //push 方法将一个或多个元素添加到数组的末尾，并返回数组的新长度。
            inventory.push(newWeapon);
            text.innerText += 'In your inventory you have: ' + inventory;
        } else{
            text.innerText = 'You do not have enough gold to buy a weapon.'
        }
    }else{
        text.innerText = 'You already have the most powerful weapon!';
        button2.innerText = 'Sell weapon for 15 gold';
        button2.onclick = sellWeapon;
    }
}
function sellWeapon(){
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        //将玩家的物品栏中的第一个物品作为当前装备
        let currentWeapon = inventory.shift();
        text.innerText = 'You sold a ' + currentWeapon + '.';
        text.innerText += 'In your inventory you have: ' + inventory + '.';
    }else{
        text.innerText = 'Don\'t sell your weapon!'
    }

}

function fightSlime(){
    fighting = 0;
    goFight();

}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = 'The ' + monsters[fighting].name + ' attacks.';
    text.innerText += 'You attack the monster with your ' + weapons[currentWeapon].name + '.';
    
    if(isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += 'You missed.';
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0){
        lose();
    }else if (monsterHealth <= 0){
        //另外一种写法fighting === 2 ？ winGame() : defeatMonster();
        if (fighting == 2){
            winGame();
        }else{
            defeatMonster();
        }
    }

    if (Math.random() <= .1 && inventory.length !==1){
        text.innerText += 'Your ' + inventory.pop() + ' breaks.';
        currentWeapon--;
    }
}

function dodge(){
    text.innerText = 'You dodge the attack from the ' + monsters[fighting].name + '.';
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;

}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers = [];
    while (numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = 'You picked ' + guess + '. Here are the random numbers: \n';
    for (let i = 0; i < 10; i ++) {
        text.innerText += numbers[i] + '\n';
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += 'Right! You win 20 gold!';
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += 'Wrong! You lose 10 health!';
        health -= 10;
        healthText.innerText = health;
        if(health <= 0){
            lose();
        }
    }
}