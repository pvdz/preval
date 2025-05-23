# Preval test case

# unknown_string_right.md

> Normalize > Binary > With > Constructor > Unknown string right
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
const x = '' + $(ok);

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
const tmpBinBothRhs /*:unknown*/ = $(ok);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement$25 /*:boolean*/ = String == x;
const tmpArrElement$27 /*:boolean*/ = String != x;
const tmpArrElement /*:number*/ = `function String() { [native code] }` ** x;
const tmpArrElement$7 /*:string*/ = `function String() { [native code] }${x}`;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `function String() { [native code] }` < x;
const tmpArrElement$19 /*:boolean*/ = `function String() { [native code] }` > x;
const tmpArrElement$21 /*:boolean*/ = `function String() { [native code] }` <= x;
const tmpArrElement$23 /*:boolean*/ = `function String() { [native code] }` >= x;
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
const x = $coerce($(ok), `plustr`);
const tmpArrElement$25 = String == x;
const tmpArrElement$27 = String != x;
const tmpArrElement = `function String() { [native code] }` ** x;
const tmpArrElement$7 = `function String() { [native code] }${x}`;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
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
const a = $( ok );
const b = $coerce( a, "plustr" );
const c = String == b;
const d = String != b;
const e = "function String() { [native code] }" ** b;
const f = `function String() { [native code] }${b}`;
const g = 0 << b;
const h = 0 >> b;
const i = 0 >>> b;
const j = "function String() { [native code] }" < b;
const k = "function String() { [native code] }" > b;
const l = "function String() { [native code] }" <= b;
const m = "function String() { [native code] }" >= b;
const n = 0 ^ b;
const o = 0 | b;
const p = [ e, NaN, NaN, NaN, f, NaN, g, h, i, j, k, l, m, c, d, false, true, 0, n, o ];
$( p );
const q = String in b;
$( q );
const r = String instanceof b;
$( r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(ok);
const x = tmpBinBothLhs + tmpBinBothRhs;
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


BAD@! Found 1 implicit global bindings:

ok


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
