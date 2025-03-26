# Preval test case

# obj_left.md

> Normalize > Binary > With > Constructor > Obj left
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** String,
  x * String,
  x / String,
  x % String,
  x + String,
  x - String,
  x << String,
  x >> String,
  x >>> String,
  x < String,
  x > String,
  x <= String,
  x >= String,
  x == String,
  x != String,
  x === String,
  x !== String,
  x & String,
  x ^ String,
  x | String,
];
$(arr);
$(x in String);
$(x instanceof String);
`````


## Settled


`````js filename=intro
const x /*:object*/ = {
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatR /*:string*/ = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < `function String() { [native code] }`;
const tmpArrElement$19 /*:boolean*/ = x > `function String() { [native code] }`;
const tmpArrElement$21 /*:boolean*/ = x <= `function String() { [native code] }`;
const tmpArrElement$23 /*:boolean*/ = x >= `function String() { [native code] }`;
const tmpArrElement$25 /*:boolean*/ = x == String;
const tmpArrElement$27 /*:boolean*/ = x != String;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$7 /*:string*/ = `${tmpStringConcatR}function String() { [native code] }`;
const arr /*:array*/ = [
  NaN,
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
const tmpCalleeParam /*:boolean*/ = x in String;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof String;
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatR = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x == String;
const tmpArrElement$27 = x != String;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
$([
  NaN,
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
$(x in String);
$(x instanceof String);
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
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const c = $coerce( a, "plustr" );
a ** 0;
const d = a << 0;
const e = a >> 0;
const f = a >>> 0;
const g = a < "function String() { [native code] }";
const h = a > "function String() { [native code] }";
const i = a <= "function String() { [native code] }";
const j = a >= "function String() { [native code] }";
const k = a == String;
const l = a != String;
a ** 0;
const m = a ^ 0;
const n = a | 0;
const o = `${c}function String() { [native code] }`;
const p = [ NaN, NaN, NaN, NaN, o, NaN, d, e, f, g, h, i, j, k, l, false, true, 0, m, n ];
$( p );
const q = a in String;
$( q );
const r = a instanceof String;
$( r );
`````


## Todos triggered


None


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
 - 17: 
  [
    NaN,
    NaN,
    NaN,
    NaN,
    '100function() { [native code] }',
    NaN,
    100,
    100,
    100,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    0,
    100,
    100,
  ],

 - 18: 'toString'
 - 19: true
 - 20: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
