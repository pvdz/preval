# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Constructor > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 + $(1);

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
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const x$1 /*:primitive*/ = $$0;
  debugger;
  const tmpStringConcatL /*:string*/ = $coerce(x$1, `plustr`);
  const tmpRet /*:string*/ = `function String() { [native code] }${tmpStringConcatL}`;
  return tmpRet;
};
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:primitive*/ = 1 + tmpBinBothRhs;
const tmpArrElement$7 /*:string*/ = $frfr(tmpFree, x);
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `function String() { [native code] }` < x;
const tmpArrElement$19 /*:boolean*/ = `function String() { [native code] }` > x;
const tmpArrElement$21 /*:boolean*/ = `function String() { [native code] }` <= x;
const tmpArrElement$23 /*:boolean*/ = `function String() { [native code] }` >= x;
const tmpArrElement$25 /*:boolean*/ = String == x;
const tmpArrElement$27 /*:boolean*/ = String != x;
const tmpArrElement$29 /*:boolean*/ = String === x;
const tmpArrElement$31 /*:boolean*/ = String !== x;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
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
const tmpCalleeParam /*:boolean*/ = String in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = String instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x$1) {
  const tmpRet = `function String() { [native code] }${x$1}`;
  return tmpRet;
};
const tmpBinBothRhs = $(1);
const x = 1 + tmpBinBothRhs;
const tmpArrElement$7 = $frfr(tmpFree, x);
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
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
$(String in x);
$(String instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = 1 + $(1);
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
const tmpCalleeParam = String in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = String instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = $coerce( c, "plustr" );
  const e = `function String() { [native code] }${d}`;
  return e;
};
const f = $( 1 );
const g = 1 + f;
const h = i( a, g );
const j = 0 << g;
const k = 0 >> g;
const l = 0 >>> g;
const m = "function String() { [native code] }" < g;
const n = "function String() { [native code] }" > g;
const o = "function String() { [native code] }" <= g;
const p = "function String() { [native code] }" >= g;
const q = String == g;
const r = String != g;
const s = String === g;
const t = String !== g;
const u = 0 ^ g;
const v = 0 | g;
const w = [ NaN, NaN, NaN, NaN, h, NaN, j, k, l, m, n, o, p, q, r, s, t, 0, u, v ];
$( w );
const x = String in g;
$( x );
const y = String instanceof g;
$( y );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, 'function() { [native code] }2', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 2, 2]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'function() { [native code] }' in 2 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
