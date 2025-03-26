# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > Constructor > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x
- loopProtectLimit=1000

## Input

`````js filename=intro
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
const tmpArrElement$29 /*:boolean*/ = x === String;
const tmpArrElement$31 /*:boolean*/ = x !== String;
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
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = $coerce( x, "plustr" );
x ** 0;
const b = x << 0;
const c = x >> 0;
const d = x >>> 0;
const e = x < "function String() { [native code] }";
const f = x > "function String() { [native code] }";
const g = x <= "function String() { [native code] }";
const h = x >= "function String() { [native code] }";
const i = x == String;
const j = x != String;
const k = x === String;
const l = x !== String;
x ** 0;
const m = x ^ 0;
const n = x | 0;
const o = `${a}function String() { [native code] }`;
const p = [ NaN, NaN, NaN, NaN, o, NaN, b, c, d, e, f, g, h, i, j, k, l, 0, m, n ];
$( p );
const q = x in String;
$( q );
const r = x instanceof String;
$( r );
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
