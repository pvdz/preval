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
const tmpArrElement /*:number*/ = undefined ** x;
const tmpArrElement$7 /*:string*/ = undefined + x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$35 /*:number*/ /*^0*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ /*|0*/ = 0 | x;
const arr /*:array*/ /*truthy*/ = [
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
const tmpCalleeParam /*:boolean*/ = undefined in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = undefined instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(ok), `plustr`);
const tmpArrElement = undefined ** x;
const tmpArrElement$7 = undefined + x;
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
$(undefined in x);
$(undefined instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( ok );
const b = $coerce( a, "plustr" );
const c = undefined ** b;
const d = undefined + b;
const e = 0 << b;
const f = 0 >> b;
const g = 0 >>> b;
const h = 0 ^ b;
const i = 0 | b;
const j = [ c, NaN, NaN, NaN, d, NaN, e, f, g, false, false, false, false, false, true, false, true, 0, h, i ];
$( j );
const k = undefined in b;
$( k );
const l = undefined instanceof b;
$( l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(ok);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = undefined ** x;
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
$coerce(x, `number`);
const tmpArrElement$17 = false;
$coerce(x, `number`);
const tmpArrElement$19 = false;
$coerce(x, `number`);
const tmpArrElement$21 = false;
$coerce(x, `number`);
const tmpArrElement$23 = false;
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
let tmpCalleeParam = undefined in x;
$(tmpCalleeParam);
let tmpCalleeParam$1 = undefined instanceof x;
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
