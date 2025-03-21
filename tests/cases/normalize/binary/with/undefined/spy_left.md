# Preval test case

# spy_left.md

> Normalize > Binary > With > Undefined > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
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
const x /*:unknown*/ = $spy();
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
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === undefined;
const tmpArrElement$31 /*:boolean*/ = x !== undefined;
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
const x = $spy();
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
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$29 = x === undefined;
const tmpArrElement$31 = x !== undefined;
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
const a = $spy();
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const b = a + undefined;
a ** 0;
const c = a << 0;
const d = a >> 0;
const e = a >>> 0;
$coerce( a, "number" );
$coerce( a, "number" );
$coerce( a, "number" );
$coerce( a, "number" );
const f = a == undefined;
const g = a != undefined;
a ** 0;
const h = a ^ 0;
const i = a | 0;
const j = a === undefined;
const k = a !== undefined;
const l = [ NaN, NaN, NaN, NaN, b, NaN, c, d, e, false, false, false, false, f, g, j, k, 0, h, i ];
$( l );
const m = a in undefined;
$( m );
const n = a instanceof undefined;
$( n );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: '$spy[1].valueOf()'
 - 8: '$spy[1].valueOf()'
 - 9: '$spy[1].valueOf()'
 - 10: '$spy[1].valueOf()'
 - 11: '$spy[1].valueOf()'
 - 12: '$spy[1].valueOf()'
 - 13: '$spy[1].valueOf()'
 - 14: '$spy[1].valueOf()'
 - 15: '$spy[1].valueOf()'
 - 16: '$spy[1].valueOf()'
 - 17: '$spy[1].valueOf()'
 - 18: [NaN, NaN, NaN, NaN, NaN, NaN, 12345, 12345, 12345, false, false, false, false, false, true, false, true, 0, 12345, 12345]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in undefined ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
