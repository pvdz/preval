# Preval test case

# obj_right.md

> Normalize > Binary > With > Constructor > Obj right
>
> Deal with certain primitive with binary ops

Weak comparison dictates that when both sides are eq type
that it must be a strong comparison instead. At which point
the object literal obviously will not match the global `String`.

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};
const arr = [
  String ** x,
  String * x,
  String / x,
  String % x,
  String + x,
  String - x,
  String << x,
  String >> x,
  String >>> x,
  String < x,
  String > x,
  String <= x,
  String >= x,
  String == x,
  String != x,
  String === x,
  String !== x,
  String & x,
  String ^ x,
  String | x,
];
$(arr);
$(String in x);
$(String instanceof x);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = {
  toString() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement /*:number*/ = `function String() { [native code] }` ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `function String() { [native code] }` < x;
const tmpArrElement$19 /*:boolean*/ = `function String() { [native code] }` > x;
const tmpArrElement$21 /*:boolean*/ = `function String() { [native code] }` <= x;
const tmpArrElement$23 /*:boolean*/ = `function String() { [native code] }` >= x;
const tmpArrElement$25 /*:boolean*/ = String == x;
const tmpArrElement$27 /*:boolean*/ = String != x;
x ** 0;
const tmpArrElement$35 /*:number*/ /*^0*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ /*|0*/ = 0 | x;
const tmpArrElement$7 /*:string*/ /*truthy*/ = `function String() { [native code] }${tmpStringConcatL}`;
const arr /*:array*/ /*truthy*/ = [
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = String in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = String instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {
  toString() {
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = `function String() { [native code] }` ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL = x + ``;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
const tmpArrElement$25 = String == x;
const tmpArrElement$27 = String != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$7 = `function String() { [native code] }${tmpStringConcatL}`;
$([
  tmpArrElement,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(String in x);
$(String instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    const b = $( "toString" );
    return b;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
const c = "function String() { [native code] }" ** a;
a ** 0;
a ** 0;
a ** 0;
const d = $coerce( a, "plustr" );
a ** 0;
const e = 0 << a;
const f = 0 >> a;
const g = 0 >>> a;
const h = "function String() { [native code] }" < a;
const i = "function String() { [native code] }" > a;
const j = "function String() { [native code] }" <= a;
const k = "function String() { [native code] }" >= a;
const l = String == a;
const m = String != a;
a ** 0;
const n = 0 ^ a;
const o = 0 | a;
const p = `function String() { [native code] }${d}`;
const q = [ c, NaN, NaN, NaN, p, NaN, e, f, g, h, i, j, k, l, m, false, true, 0, n, o ];
$( q );
const r = String in a;
$( r );
const s = String instanceof a;
$( s );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = {
  toString() {
    debugger;
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = `function String() { [native code] }` ** x;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$7 = `function String() { [native code] }${tmpStringConcatL}`;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
const tmpArrElement$25 = String == x;
const tmpArrElement$27 = String != x;
const tmpArrElement$29 = String === x;
const tmpArrElement$31 = String !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
let tmpCalleeParam = String in x;
$(tmpCalleeParam);
let tmpCalleeParam$1 = String instanceof x;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'valueOf'
 - 2: 'valueOf'
 - 3: 'valueOf'
 - 4: 'valueOf'
 - 5: 'valueOf'
 - 6: 'valueOf'
 - 7: 'valueOf'
 - 8: 'valueOf'
 - 9: 'valueOf'
 - 10: 'valueOf'
 - 11: 'valueOf'
 - 12: 'valueOf'
 - 13: 'valueOf'
 - 14: 'valueOf'
 - 15: 'valueOf'
 - 16: 'valueOf'
 - 17: [NaN, NaN, NaN, NaN, 'function() { [native code] }100', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
