//exercise 1
const operation = (a, b, callback) => callback(a,b);

//exercise 2
const operationAsync = async (a, b, callback) => callback(a,b);

//exercise 2 - option 2 
const operationAsyncV2 = (a, b, callback) => {
    return new Promise(resolve => {
        return resolve(callback(a, b));
    });
}

//exercise 3
(async () => {
    try {
        const [op1, op2] = await Promise.all([operation(10, 15, (a,b) => a + b), operationAsync(10, 15, (a,b) => a + b)]);
        console.log('Promise.all: ', op1 + op2);
    } catch (error) {
        console.error('Something went wrong', error);
    }
})();

console.log('Operation Sync: ', operation(10, 15, (a,b) => a + b));
console.log('Operation Async 1: ', operationAsync(10, 15, (a,b) => a * b));
console.log('Operation Async 2: ', operationAsyncV2(10, 15, (a,b) => a * b));