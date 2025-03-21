# Preval test case

# spy_left.md

> Normalize > Binary > With > Constructor > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();

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
const x /*:unknown*/ = $spy();
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
const tmpArrElement$29 /*:boolean*/ = x === String;
const tmpArrElement$31 /*:boolean*/ = x !== String;
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
  tmpArrElement$29,
  tmpArrElement$31,
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
const x = $spy();
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
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
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
  tmpArrElement$29,
  tmpArrElement$31,
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
const a = $spy();
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const b = $coerce( a, "plustr" );
a ** 0;
const c = a << 0;
const d = a >> 0;
const e = a >>> 0;
const f = a < "function String() { [native code] }";
const g = a > "function String() { [native code] }";
const h = a <= "function String() { [native code] }";
const i = a >= "function String() { [native code] }";
const j = a == String;
const k = a != String;
a ** 0;
const l = a ^ 0;
const m = a | 0;
const n = `${b}function String() { [native code] }`;
const o = a === String;
const p = a !== String;
const q = [ NaN, NaN, NaN, NaN, n, NaN, c, d, e, f, g, h, i, j, k, o, p, 0, l, m ];
$( q );
const r = a in String;
$( r );
const s = a instanceof String;
$( s );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: '$spy[1].valueOf()'
 - 8: '$spy[1].valueOf()'
 - 9: '$spy[1].valueOf()'
 - 10: '$spy[1].valueOf()'
 - 11: '$spy[1].valueOf()'
 - 12: '$spy[1].valueOf()'
 - 13: '$spy[1].valueOf()'
 - 14: '$spy[1].valueOf()'
 - 15: '$spy[1].valueOf()'
 - 16: '$spy[1].valueOf()'
 - 17: '$spy[1].valueOf()'
 - 18: 
  [
    NaN,
    NaN,
    NaN,
    NaN,
    '12345function() { [native code] }',
    NaN,
    12345,
    12345,
    12345,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    0,
    12345,
    12345,
  ],

 - 19: '$spy[1].toString()'
 - 20: false
 - 21: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
