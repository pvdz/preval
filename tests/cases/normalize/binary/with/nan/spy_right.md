# Preval test case

# spy_right.md

> Normalize > Binary > With > Nan > Spy right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
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
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = NaN + x;
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
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
const x = $spy();
const tmpArrElement = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = NaN + x;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
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


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = NaN ** a;
a ** 0;
a ** 0;
a ** 0;
const c = NaN + a;
a ** 0;
const d = 0 << a;
const e = 0 >> a;
const f = 0 >>> a;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const g = 0 ^ a;
const h = 0 | a;
const i = [ b, NaN, NaN, NaN, c, NaN, d, e, f, false, false, false, false, false, true, false, true, 0, g, h ];
$( i );
const j = NaN in a;
$( j );
const k = NaN instanceof a;
$( k );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
 - 20: [NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 12345, 12345]
 - 21: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
