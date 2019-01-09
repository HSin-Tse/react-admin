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
        let x = yield `hcia 再等一下，i = ${i}`;
        console.log(x);
    }
}
console.log('hcia 終於輪到我了 A');

setTimeout(() => {
    console.log('hcia 終於輪到我了');
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

    console.log('hcia',x + y + z);
}

add(); // 6
// var aaaa = '1'
// export default aaaa
