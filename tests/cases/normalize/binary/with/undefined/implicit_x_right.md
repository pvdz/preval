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
x ** 0;
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
  NaN,
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
x ** 0;
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
  NaN,
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

## Pre Normal


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

## Normalized


`````js filename=intro
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
const tmpCalleeParam = undefined in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = undefined instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = undefined + x;
x ** 0;
const b = 0 << x;
const c = 0 >> x;
const d = 0 >>> x;
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
const e = undefined == x;
const f = undefined != x;
const g = undefined === x;
const h = undefined !== x;
x ** 0;
const i = 0 ^ x;
const j = 0 | x;
const k = [ NaN, NaN, NaN, NaN, a, NaN, b, c, d, false, false, false, false, e, f, g, h, 0, i, j ];
$( k );
const l = undefined in x;
$( l );
const m = undefined instanceof x;
$( m );
`````

## Globals

None (except for the 1 globals expected by the test)

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
