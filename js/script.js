// semicolons分号
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monterHealth;
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
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#MonsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');

const weapons = [{name:'stick', power : 5},
    {name: 'dagger', power: 30}, 
    {name: 'claw hammer', power:50},
    {name: 'sword', power: 100}];
    
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
    text:'You enter the cave. You see some monsters'

    }];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
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

function fightDragon(){
    console.log('Fighting Dragon.')
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
    if (gold >= 30){
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = 'You now have a' + newWeapon + '.';
        inventory.push(newWeapon);
        text.innerText += 'In your inventory you have: ' + inventory;
    } else{
        text.innerText = 'You do not have enough gold to buy a weapon.'
    }

}

function fightBeast(){

}

function fightSlime(){

}