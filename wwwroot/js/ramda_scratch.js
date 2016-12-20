console.log( "Ready!" );
/*
  Currying is a process where a function with multiple (let’s say n) arguments
  is transformed to a function with a single argument returning another function
  with a single argument. This goes on until all required arguments are
  collected.
*/
// Ramda.js helper is to write a one-argument wrapper which tests whether its
// argument is a string

// ...without currying...
const isStringWithoutCurry = test => R.is(String, test);
const result1 = isStringWithoutCurry('foo');

// ...with currying...
const isStringWithCurry = R.is( String );
const result2 = isStringWithCurry('foo'); //=> true

// ...without Ramda.js...
const quadraticWithoutRamda = (a, b, c, x) => x * x * a + x * b + c;
quadraticWithoutRamda(1, 0, 0, 2); //=> 4
// quadraticWithoutRamda(1, 0, 0)(2); //=> TypeError: quadratic(..) is not a function

// ...with Ramda.js...
const quadraticWithRamda = R.curry( ( a, b, c, x ) => x * x * a + x * b + c );
quadraticWithRamda(1, 0, 0, 2); //=> 4
quadraticWithRamda(1, 0, 0)(2); //=> 4
// __________________________________________________________________________

/*
 Immutable structures:
*/
const position1 = {
    x: 5,
    y: 9
};
position1.x = 10; // NOT an immutable structure

const position2 = ( (x, y) => {
    return {
        getX() { return x; },
        getY() { return y; }
    };
} );
// position2.getX() = 10; // does not work bc CANNOT access inner fn!
// __________________________________________________________________________

const getElements = name => {
  let results;

  if ( getElements.cache[name] ) {
    results = getElements.cache[name];
  } else {
    results = document.getElementsByTagName( name );
    getElements.cache[name] = results;
  }

  return results;
};

getElements.cache = {};

console.log( `Elements found: ${getElements('pre').length}` );
console.log( `Cache found: ${getElements.cache.pre.length}` );
// __________________________________________________________________________
/*
 Imperative Obj Oriented Bank app: has environment / uses state
*/
// const Bank = balance => this.balance = balance; // ctor
// Bank.prototype.withdrawl = amount => { // issue: cannot set prototype 'withdrawl'
//     this.balance = this.balance - amount;
//     return this.balance;
// };
// const bank = new Bank( 100 );
// // Calling withdrawl with the same arg return different values === IMPURE FN
// console.log( bank.withdrawl( 25 ) ); // returns balance
// console.log( bank.withdrawl( 25 ) ); // returns balance
// __________________________________________________________________________
/*
 Imperative Bank app: obj literals
*/
const createBank = ( balance ) => {
    return {
        balance,
        withdrawl( amount ) {
            this.balance -= amount;
            return this.balance;
        }
    };
};
const bank = createBank( 100 );
console.log( bank.withdrawl( 25 ) );
console.log( bank.withdrawl( 25 ) );
// __________________________________________________________________________

/*
 Functional OO Bank app:
*/
const FBank = balance => {
    this.balance = balance;
};
