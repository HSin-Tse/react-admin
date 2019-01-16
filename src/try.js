// let arr = ['react', 'angular', 'vue']
//
// if (arr.includes('react')) {
//     console.log('hcia', 'Can use React')
// }

// let obj = {a: 1, b: 2, c: 3}
// Object.entries(obj).forEach(([key, value]) => {
//     console.log(`hcia ${key} is ${value}`)
// })

function *foo() {
    for (let i = 1; i <= 3; i++) {
        // let x = yield `hcia 再等一下，i = ${i}`;
        // console.log(x);
    }
}
// console.log('hcia 終於輪到我了 A');

setTimeout(() => {
    // console.log('hcia 終於輪到我了');
}, 300);

var a = foo();
console.log(a); // foo {<closed>}

var b = a.next();
console.log(b); // {value: "再等一下，i = 1", done: false}

var c = a.next();
console.log(c); // {value: "再等一下，i = 2", done: false}

var d = a.next();
console.log(d); // {value: "再等一下，i = 3", done: false}

var e = a.next();
console.log(e);





function getA() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(1);
        }, 1000);
    })
}

function getB() {
    return new Promise(function(resolve, reject) {
        resolve(2);
    });
}

function getC() {
    return new Promise(function(resolve, reject) {
        resolve(3);
    });
}

async function add() {
    var x = await getA();
    var y = await getB();
    var z = await getC();

    // console.log('hcia',x + y + z);
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
add(); //


// timestampToTime = (timestamp) => {
//     const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
//     const year = dateObj.getFullYear() // 获取年，
//     const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
//     const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
//     const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
//     const minutes = this.pad(dateObj.getMinutes()) // 获取分
//     const seconds = this.pad(dateObj.getSeconds()) // 获取秒
//     return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
// };
// pad = (str) => {
//     return +str >= 10 ? str : '0' + str
// };
// export default aaaa
