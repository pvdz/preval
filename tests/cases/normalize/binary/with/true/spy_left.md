# Preval test case

# spy_left.md

> Normalize > Binary > With > True > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);
$(x in true);
$(x instanceof true);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = x ** 1;
const tmpArrElement$1 /*:number*/ = x * 1;
const tmpArrElement$3 /*:number*/ = x / 1;
const tmpArrElement$5 /*:number*/ = x % 1;
const tmpArrElement$7 /*:primitive*/ = x + true;
const tmpArrElement$9 /*:number*/ = x - 1;
const tmpArrElement$11 /*:number*/ = x << 1;
const tmpArrElement$13 /*:number*/ = x >> 1;
const tmpArrElement$15 /*:number*/ = x >>> 1;
const tmpArrElement$17 /*:boolean*/ = x < true;
const tmpArrElement$19 /*:boolean*/ = x > true;
const tmpArrElement$21 /*:boolean*/ = x <= true;
const tmpArrElement$23 /*:boolean*/ = x >= true;
const tmpArrElement$25 /*:boolean*/ = x == true;
const tmpArrElement$27 /*:boolean*/ = x != true;
const tmpArrElement$33 /*:number*/ = x & 1;
const tmpArrElement$35 /*:number*/ = x ^ 1;
const tmpArrElement$37 /*:number*/ = x | 1;
const tmpArrElement$29 /*:boolean*/ = x === true;
const tmpArrElement$31 /*:boolean*/ = x !== true;
const arr /*:array*/ = [
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
const tmpCalleeParam /*:boolean*/ = x in true;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof true;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
const tmpArrElement$29 = x === true;
const tmpArrElement$31 = x !== true;
$([
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
]);
$(x in true);
$(x instanceof true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a ** 1;
const c = a * 1;
const d = a / 1;
const e = a % 1;
const f = a + true;
const g = a - 1;
const h = a << 1;
const i = a >> 1;
const j = a >>> 1;
const k = a < true;
const l = a > true;
const m = a <= true;
const n = a >= true;
const o = a == true;
const p = a != true;
const q = a & 1;
const r = a ^ 1;
const s = a | 1;
const t = a === true;
const u = a !== true;
const v = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, t, u, q, r, s ];
$( v );
const w = a in true;
$( w );
const x = a instanceof true;
$( x );
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
 - 20: [12345, 12345, 12345, 0, 12346, 12344, 24690, 6172, 6172, false, true, false, true, false, true, false, true, 1, 12344, 12345]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in true ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
