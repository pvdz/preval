# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > Constructor > Unknown number left
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
const x = 1 * $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpStringConcatR /*:string*/ = $coerce(x, `string`);
const tmpArrElement$25 /*:boolean*/ = x == String;
const tmpArrElement$27 /*:boolean*/ = x != String;
const tmpArrElement$7 /*:string*/ = `${tmpStringConcatR}function String() { [native code] }`;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < `function String() { [native code] }`;
const tmpArrElement$19 /*:boolean*/ = x > `function String() { [native code] }`;
const tmpArrElement$21 /*:boolean*/ = x <= `function String() { [native code] }`;
const tmpArrElement$23 /*:boolean*/ = x >= `function String() { [native code] }`;
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
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpStringConcatR = $coerce(x, `string`);
const tmpArrElement$25 = x == String;
const tmpArrElement$27 = x != String;
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
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
const a = $( 1 );
const b = 1 * a;
const c = $coerce( b, "string" );
const d = b == String;
const e = b != String;
const f = `${c}function String() { [native code] }`;
const g = b << 0;
const h = b >> 0;
const i = b >>> 0;
const j = b < "function String() { [native code] }";
const k = b > "function String() { [native code] }";
const l = b <= "function String() { [native code] }";
const m = b >= "function String() { [native code] }";
const n = b ^ 0;
const o = b | 0;
const p = [ NaN, NaN, NaN, NaN, f, NaN, g, h, i, j, k, l, m, d, e, false, true, 0, n, o ];
$( p );
const q = b in String;
$( q );
const r = b instanceof String;
$( r );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, '1function() { [native code] }', NaN, 1, 1, 1, false, false, false, false, false, true, false, true, 0, 1, 1]
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
