# Preval test case

# spy_left.md

> Normalize > Binary > With > Regex > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  x ** /foo/g,
  x * /foo/g,
  x / /foo/g,
  x % /foo/g,
  x + /foo/g,
  x - /foo/g,
  x << /foo/g,
  x >> /foo/g,
  x >>> /foo/g,
  x < /foo/g,
  x > /foo/g,
  x <= /foo/g,
  x >= /foo/g,
  x == /foo/g,
  x != /foo/g,
  x === /foo/g,
  x !== /foo/g,
  x & /foo/g,
  x ^ /foo/g,
  x | /foo/g,
];
$(arr);
$(x in /foo/g);
$(x instanceof /foo/g);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpBinBothRhs /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 /*:primitive*/ = x + tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpBinBothRhs$31 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpBinBothRhs$33 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$37;
const tmpArrElement$29 /*:boolean*/ = x === tmpBinBothRhs$29;
const tmpArrElement$31 /*:boolean*/ = x !== tmpBinBothRhs$31;
const arr /*:array*/ /*truthy*/ = [
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
const tmpBinBothRhs$39 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothRhs$41 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 = x * new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 = x / new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 = x % new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 = x + new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 = x - new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 = x << new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 = x >> new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 = x >>> new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 = x < new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 = x > new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 = x <= new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 = x >= new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 = x == new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 = x != new $regex_constructor(`foo`, `g`);
const tmpBinBothRhs$29 = new $regex_constructor(`foo`, `g`);
const tmpBinBothRhs$31 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 = x & new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = x ^ new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = x | new $regex_constructor(`foo`, `g`);
const tmpArrElement$29 = x === tmpBinBothRhs$29;
const tmpArrElement$31 = x !== tmpBinBothRhs$31;
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
$(x in new $regex_constructor(`foo`, `g`));
$(x instanceof new $regex_constructor(`foo`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = new $regex_constructor( "foo", "g" );
const c = a ** b;
const d = new $regex_constructor( "foo", "g" );
const e = a * d;
const f = new $regex_constructor( "foo", "g" );
const g = a / f;
const h = new $regex_constructor( "foo", "g" );
const i = a % h;
const j = new $regex_constructor( "foo", "g" );
const k = a + j;
const l = new $regex_constructor( "foo", "g" );
const m = a - l;
const n = new $regex_constructor( "foo", "g" );
const o = a << n;
const p = new $regex_constructor( "foo", "g" );
const q = a >> p;
const r = new $regex_constructor( "foo", "g" );
const s = a >>> r;
const t = new $regex_constructor( "foo", "g" );
const u = a < t;
const v = new $regex_constructor( "foo", "g" );
const w = a > v;
const x = new $regex_constructor( "foo", "g" );
const y = a <= x;
const z = new $regex_constructor( "foo", "g" );
const ba = a >= z;
const bb = new $regex_constructor( "foo", "g" );
const bc = a == bb;
const bd = new $regex_constructor( "foo", "g" );
const be = a != bd;
const bf = new $regex_constructor( "foo", "g" );
const bg = new $regex_constructor( "foo", "g" );
const bh = new $regex_constructor( "foo", "g" );
const bi = a & bh;
const bj = new $regex_constructor( "foo", "g" );
const bk = a ^ bj;
const bl = new $regex_constructor( "foo", "g" );
const bm = a | bl;
const bn = a === bf;
const bo = a !== bg;
const bp = [ c, e, g, i, k, m, o, q, s, u, w, y, ba, bc, be, bn, bo, bi, bk, bm ];
$( bp );
const bq = new $regex_constructor( "foo", "g" );
const br = a in bq;
$( br );
const bs = new $regex_constructor( "foo", "g" );
const bt = a instanceof bs;
$( bt );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy();
const tmpBinBothLhs = x;
const tmpBinBothRhs = new $regex_constructor(`foo`, `g`);
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = tmpBinBothLhs$37 | tmpBinBothRhs$37;
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
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam = tmpBinBothLhs$39 in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$1 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
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
 - 18: [NaN, NaN, NaN, NaN, '12345/foo/g', NaN, 12345, 12345, 12345, false, false, false, false, false, true, false, true, 0, 12345, 12345]
 - 19: '$spy[1].toString()'
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
