# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > Undefined > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  x ** undefined,
  x * undefined,
  x / undefined,
  x % undefined,
  x + undefined,
  x - undefined,
  x << undefined,
  x >> undefined,
  x >>> undefined,
  x < undefined,
  x > undefined,
  x <= undefined,
  x >= undefined,
  x == undefined,
  x != undefined,
  x === undefined,
  x !== undefined,
  x & undefined,
  x ^ undefined,
  x | undefined,
];
$(arr);
$(x in undefined);
$(x instanceof undefined);
`````


## Settled


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = x + undefined;
x ** 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
const tmpArrElement$25 /*:boolean*/ = x == undefined;
const tmpArrElement$27 /*:boolean*/ = x != undefined;
const tmpArrElement$29 /*:boolean*/ = x === undefined;
const tmpArrElement$31 /*:boolean*/ = x !== undefined;
x ** 0;
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
const tmpCalleeParam /*:boolean*/ = x in undefined;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof undefined;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = x + undefined;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
const tmpArrElement$25 = x == undefined;
const tmpArrElement$27 = x != undefined;
const tmpArrElement$29 = x === undefined;
const tmpArrElement$31 = x !== undefined;
x ** 0;
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
$(x in undefined);
$(x instanceof undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = x + undefined;
x ** 0;
const b = x << 0;
const c = x >> 0;
const d = x >>> 0;
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
$coerce( x, "number" );
const e = x == undefined;
const f = x != undefined;
const g = x === undefined;
const h = x !== undefined;
x ** 0;
const i = x ^ 0;
const j = x | 0;
const k = [ NaN, NaN, NaN, NaN, a, NaN, b, c, d, false, false, false, false, e, f, g, h, 0, i, j ];
$( k );
const l = x in undefined;
$( l );
const m = x instanceof undefined;
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
