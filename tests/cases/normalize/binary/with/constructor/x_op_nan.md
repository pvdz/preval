# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Constructor > X op nan
>
> Deal with certain primitive with binary ops

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

const arr2 = [
  x in String,
  x instanceof String,
];
$(arr2);
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 /*:boolean*/ = x in String;
const tmpArrElement$41 /*:boolean*/ = x instanceof String;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const x = {
  toString() {
    debugger;
    return $(`toString`);
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
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
const arr2 = [x in String, x instanceof String];
$(arr2);
`````

## Normalized


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
x * 0;
const tmpArrElement = NaN;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x == String;
const tmpArrElement$27 = x != String;
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
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
a ** 0;
const k = a ^ 0;
const l = a | 0;
const m = `${c}function String() { [native code] }`;
const n = [ NaN, NaN, NaN, NaN, m, NaN, d, e, f, g, h, i, j, false, true, false, true, 0, k, l ];
$( n );
const o = a in String;
const p = a instanceof String;
const q = [ o, p ];
$( q );
`````

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
 - 19: [true, false]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
