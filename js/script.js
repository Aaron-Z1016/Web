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

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goStore(){
    button1.innerText = 'Buy 10 health (10 gold)';
    button2.innerText = 'Buy weapon (30 gold)';
    button3.innerText = 'Go to town square';
    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = 'You enter the store.'
}

function goCave(){
    console.log('Going to cave.')
}

function fightDragon(){
    console.log('Fighting Dragon.')
}

function buyHealth(){

}

function buyWeapon(){

}

function goTown(){
    
}