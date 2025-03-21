# Preval test case

# spy_left.md

> Normalize > Binary > With > Nan > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  x ** NaN,
  x * NaN,
  x / NaN,
  x % NaN,
  x + NaN,
  x - NaN,
  x << NaN,
  x >> NaN,
  x >>> NaN,
  x < NaN,
  x > NaN,
  x <= NaN,
  x >= NaN,
  x == NaN,
  x != NaN,
  x === NaN,
  x !== NaN,
  x & NaN,
  x ^ NaN,
  x | NaN,
];
$(arr);
$(x in NaN);
$(x instanceof NaN);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = x + NaN;
x ** 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = x in NaN;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof NaN;
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
const tmpArrElement$7 = x + NaN;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
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
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in NaN);
$(x instanceof NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const b = a + NaN;
a ** 0;
const c = a << 0;
const d = a >> 0;
const e = a >>> 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const f = a ^ 0;
const g = a | 0;
const h = [ NaN, NaN, NaN, NaN, b, NaN, c, d, e, false, false, false, false, false, true, false, true, 0, f, g ];
$( h );
const i = a in NaN;
$( i );
const j = a instanceof NaN;
$( j );
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
 - 18: '$spy[1].valueOf()'
 - 19: '$spy[1].valueOf()'
 - 20: [NaN, NaN, NaN, NaN, NaN, NaN, 12345, 12345, 12345, false, false, false, false, false, true, false, true, 0, 12345, 12345]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in NaN ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
