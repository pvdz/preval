# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > Undefined > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
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
const tmpArrElement /*:number*/ = undefined ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = undefined + x;
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
const tmpArrElement$25 /*:boolean*/ = undefined == x;
const tmpArrElement$27 /*:boolean*/ = undefined != x;
const tmpArrElement$29 /*:boolean*/ = undefined === x;
const tmpArrElement$31 /*:boolean*/ = undefined !== x;
x ** 0;
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
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
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
const tmpArrElement = undefined ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = undefined + x;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
const tmpArrElement$25 = undefined == x;
const tmpArrElement$27 = undefined != x;
const tmpArrElement$29 = undefined === x;
const tmpArrElement$31 = undefined !== x;
x ** 0;
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
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
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
const a = undefined ** x;
x ** 0;
x ** 0;
x ** 0;
const b = undefined + x;
x ** 0;
const c = 0 << x;
const d = 0 >> x;
const e = 0 >>> x;
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
const f = undefined == x;
const g = undefined != x;
const h = undefined === x;
const i = undefined !== x;
x ** 0;
const j = 0 ^ x;
const k = 0 | x;
const l = [ a, NaN, NaN, NaN, b, NaN, c, d, e, false, false, false, false, f, g, h, i, 0, j, k ];
$( l );
const m = undefined in x;
$( m );
const n = undefined instanceof x;
$( n );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
