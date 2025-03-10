# Preval test case

# unknown_string_right.md

> Normalize > Binary > With > Nan > Unknown string right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $(ok);

const arr = [
  NaN ** x,
  NaN * x,
  NaN / x,
  NaN % x,
  NaN + x,
  NaN - x,
  NaN << x,
  NaN >> x,
  NaN >>> x,
  NaN < x,
  NaN > x,
  NaN <= x,
  NaN >= x,
  NaN == x,
  NaN != x,
  NaN === x,
  NaN !== x,
  NaN & x,
  NaN ^ x,
  NaN | x,
];
$(arr);
$(NaN in x);
$(NaN instanceof x);
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(ok);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement /*:number*/ = NaN ** x;
const tmpArrElement$7 /*:string*/ = NaN + x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
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
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = NaN in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = NaN instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(ok), `plustr`);
const tmpArrElement = NaN ** x;
const tmpArrElement$7 = NaN + x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
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
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(NaN in x);
$(NaN instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = `` + $(ok);
const arr = [
  NaN ** x,
  NaN * x,
  NaN / x,
  NaN % x,
  NaN + x,
  NaN - x,
  NaN << x,
  NaN >> x,
  NaN >>> x,
  NaN < x,
  NaN > x,
  NaN <= x,
  NaN >= x,
  NaN == x,
  NaN != x,
  NaN === x,
  NaN !== x,
  NaN & x,
  NaN ^ x,
  NaN | x,
];
$(arr);
$(NaN in x);
$(NaN instanceof x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(ok);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = NaN ** x;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpArrElement$7 = NaN + x;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
x * 0;
const tmpArrElement$17 = false;
x * 0;
const tmpArrElement$19 = false;
x * 0;
const tmpArrElement$21 = false;
x * 0;
const tmpArrElement$23 = false;
x * 0;
const tmpArrElement$25 = false;
x * 0;
const tmpArrElement$27 = true;
const tmpArrElement$29 = false;
const tmpArrElement$31 = true;
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
const tmpCalleeParam = NaN in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = NaN instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( ok );
const b = $coerce( a, "plustr" );
const c = NaN ** b;
const d = NaN + b;
const e = 0 << b;
const f = 0 >> b;
const g = 0 >>> b;
const h = 0 ^ b;
const i = 0 | b;
const j = [ c, NaN, NaN, NaN, d, NaN, e, f, g, false, false, false, false, false, true, false, true, 0, h, i ];
$( j );
const k = NaN in b;
$( k );
const l = NaN instanceof b;
$( l );
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
