# Preval test case

# unknown_string_right.md

> Normalize > Binary > With > Undefined > Unknown string right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $(ok);

const arr = [
  undefined ** x,
  undefined * x,
  undefined / x,
  undefined % x,
  undefined + x,
  undefined - x,
  undefined << x,
  undefined >> x,
  undefined >>> x,
  undefined < x,
  undefined > x,
  undefined <= x,
  undefined >= x,
  undefined == x,
  undefined != x,
  undefined === x,
  undefined !== x,
  undefined & x,
  undefined ^ x,
  undefined | x,
];
$(arr);
$(undefined in x);
$(undefined instanceof x);
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(ok);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement$7 /*:string*/ = undefined + x;
const tmpArrElement$17 /*:boolean*/ = undefined < x;
const tmpArrElement$19 /*:boolean*/ = undefined > x;
const tmpArrElement$21 /*:boolean*/ = undefined <= x;
const tmpArrElement$23 /*:boolean*/ = undefined >= x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = undefined in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = undefined instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(ok), `plustr`);
const tmpArrElement$7 = undefined + x;
const tmpArrElement$17 = undefined < x;
const tmpArrElement$19 = undefined > x;
const tmpArrElement$21 = undefined <= x;
const tmpArrElement$23 = undefined >= x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(undefined in x);
$(undefined instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = `` + $(ok);
const arr = [
  undefined ** x,
  undefined * x,
  undefined / x,
  undefined % x,
  undefined + x,
  undefined - x,
  undefined << x,
  undefined >> x,
  undefined >>> x,
  undefined < x,
  undefined > x,
  undefined <= x,
  undefined >= x,
  undefined == x,
  undefined != x,
  undefined === x,
  undefined !== x,
  undefined & x,
  undefined ^ x,
  undefined | x,
];
$(arr);
$(undefined in x);
$(undefined instanceof x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(ok);
const x = tmpBinBothLhs + tmpBinBothRhs;
x * 0;
const tmpArrElement = NaN;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpArrElement$7 = undefined + x;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = undefined < x;
const tmpArrElement$19 = undefined > x;
const tmpArrElement$21 = undefined <= x;
const tmpArrElement$23 = undefined >= x;
const tmpArrElement$25 = undefined == x;
const tmpArrElement$27 = undefined != x;
const tmpArrElement$29 = undefined === x;
const tmpArrElement$31 = undefined !== x;
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
const tmpCalleeParam = undefined in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = undefined instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( ok );
const b = $coerce( a, "plustr" );
const c = undefined + b;
const d = undefined < b;
const e = undefined > b;
const f = undefined <= b;
const g = undefined >= b;
const h = 0 << b;
const i = 0 >> b;
const j = 0 >>> b;
const k = 0 ^ b;
const l = 0 | b;
const m = [ NaN, NaN, NaN, NaN, c, NaN, h, i, j, d, e, f, g, false, true, false, true, 0, k, l ];
$( m );
const n = undefined in b;
$( n );
const o = undefined instanceof b;
$( o );
`````

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
