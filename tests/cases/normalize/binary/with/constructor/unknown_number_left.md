# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > Constructor > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 + $(1);

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
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const x$1 /*:primitive*/ = $$0;
  debugger;
  const tmpStringConcatR /*:string*/ = $coerce(x$1, `plustr`);
  const tmpRet /*:string*/ = `${tmpStringConcatR}function String() { [native code] }`;
  return tmpRet;
};
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:primitive*/ = 1 + tmpBinBothRhs;
const tmpArrElement$7 /*:string*/ = $frfr(tmpFree, x);
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
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
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
const tmpFree = function $free(x$1) {
  const tmpRet = `${x$1}function String() { [native code] }`;
  return tmpRet;
};
const tmpBinBothRhs = $(1);
const x = 1 + tmpBinBothRhs;
const tmpArrElement$7 = $frfr(tmpFree, x);
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
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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

## Pre Normal


`````js filename=intro
const x = 1 + $(1);
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

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
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
const tmpCalleeParam = x in String;
$(tmpCalleeParam);
const tmpCalleeParam$1 = x instanceof String;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "plustr" );
  const e = `${d}function String() { [native code] }`;
  return e;
};
const f = $( 1 );
const g = 1 + f;
const h = i( a, g );
const j = g << 0;
const k = g >> 0;
const l = g >>> 0;
const m = g < "function String() { [native code] }";
const n = g > "function String() { [native code] }";
const o = g <= "function String() { [native code] }";
const p = g >= "function String() { [native code] }";
const q = g == String;
const r = g != String;
const s = g === String;
const t = g !== String;
const u = g ^ 0;
const v = g | 0;
const w = [ NaN, NaN, NaN, NaN, h, NaN, j, k, l, m, n, o, p, q, r, s, t, 0, u, v ];
$( w );
const x = g in String;
$( x );
const y = g instanceof String;
$( y );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, '2function() { [native code] }', NaN, 2, 2, 2, false, false, false, false, false, true, false, true, 0, 2, 2]
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
