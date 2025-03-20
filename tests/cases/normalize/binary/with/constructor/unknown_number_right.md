# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Constructor > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpStringConcatL /*:string*/ = $coerce(x, `string`);
const tmpArrElement /*:number*/ = `function String() { [native code] }` ** x;
const tmpArrElement$7 /*:string*/ = `function String() { [native code] }${tmpStringConcatL}`;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `function String() { [native code] }` < x;
const tmpArrElement$19 /*:boolean*/ = `function String() { [native code] }` > x;
const tmpArrElement$21 /*:boolean*/ = `function String() { [native code] }` <= x;
const tmpArrElement$23 /*:boolean*/ = `function String() { [native code] }` >= x;
const tmpArrElement$25 /*:boolean*/ = String == x;
const tmpArrElement$27 /*:boolean*/ = String != x;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
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
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpStringConcatL = $coerce(x, `string`);
const tmpArrElement = `function String() { [native code] }` ** x;
const tmpArrElement$7 = `function String() { [native code] }${tmpStringConcatL}`;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
const tmpArrElement$25 = String == x;
const tmpArrElement$27 = String != x;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
const a = $( 1 );
const b = 1 * a;
const c = $coerce( b, "string" );
const d = "function String() { [native code] }" ** b;
const e = `function String() { [native code] }${c}`;
const f = 0 << b;
const g = 0 >> b;
const h = 0 >>> b;
const i = "function String() { [native code] }" < b;
const j = "function String() { [native code] }" > b;
const k = "function String() { [native code] }" <= b;
const l = "function String() { [native code] }" >= b;
const m = String == b;
const n = String != b;
const o = 0 ^ b;
const p = 0 | b;
const q = [ d, NaN, NaN, NaN, e, NaN, f, g, h, i, j, k, l, m, n, false, true, 0, o, p ];
$( q );
const r = String in b;
$( r );
const s = String instanceof b;
$( s );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, 'function() { [native code] }1', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'function() { [native code] }' in 1 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
