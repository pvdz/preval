# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > Regex > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
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
const tmpBinBothLhs /*:unknown*/ = x;
const tmpBinBothRhs /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement /*:number*/ = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 /*:unknown*/ = x;
const tmpBinBothRhs$1 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 /*:number*/ = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 /*:unknown*/ = x;
const tmpBinBothRhs$3 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 /*:number*/ = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 /*:unknown*/ = x;
const tmpBinBothRhs$5 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 /*:number*/ = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 /*:unknown*/ = x;
const tmpBinBothRhs$7 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 /*:primitive*/ = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 /*:unknown*/ = x;
const tmpBinBothRhs$9 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 /*:number*/ = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 /*:unknown*/ = x;
const tmpBinBothRhs$11 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 /*:number*/ = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 /*:unknown*/ = x;
const tmpBinBothRhs$13 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 /*:number*/ = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 /*:unknown*/ = x;
const tmpBinBothRhs$15 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 /*:number*/ = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 /*:unknown*/ = x;
const tmpBinBothRhs$17 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 /*:boolean*/ = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 /*:unknown*/ = x;
const tmpBinBothRhs$19 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 /*:boolean*/ = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 /*:unknown*/ = x;
const tmpBinBothRhs$21 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 /*:boolean*/ = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 /*:unknown*/ = x;
const tmpBinBothRhs$23 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 /*:boolean*/ = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 /*:unknown*/ = x;
const tmpBinBothRhs$25 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 /*:boolean*/ = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 /*:unknown*/ = x;
const tmpBinBothRhs$27 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 /*:boolean*/ = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 /*:unknown*/ = x;
const tmpBinBothRhs$29 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpBinBothLhs$31 /*:unknown*/ = x;
const tmpBinBothRhs$31 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpBinBothLhs$33 /*:unknown*/ = x;
const tmpBinBothRhs$33 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 /*:number*/ = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 /*:unknown*/ = x;
const tmpBinBothRhs$35 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 /*:number*/ = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 /*:unknown*/ = x;
const tmpBinBothRhs$37 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 /*:number*/ = tmpBinBothLhs$37 | tmpBinBothRhs$37;
const tmpArrElement$29 /*:boolean*/ = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpArrElement$31 /*:boolean*/ = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
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
const tmpBinBothLhs$39 /*:unknown*/ = x;
const tmpBinBothRhs$39 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs$39 in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothLhs$41 /*:unknown*/ = x;
const tmpBinBothRhs$41 /*:regex*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = new $regex_constructor(`foo`, `g`);
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 = x & new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = x ^ new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = x | new $regex_constructor(`foo`, `g`);
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
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
const tmpBinBothLhs$39 = x;
$(tmpBinBothLhs$39 in new $regex_constructor(`foo`, `g`));
const tmpBinBothLhs$41 = x;
$(tmpBinBothLhs$41 instanceof new $regex_constructor(`foo`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x;
const b = new $regex_constructor( "foo", "g" );
const c = a ** b;
const d = x;
const e = new $regex_constructor( "foo", "g" );
const f = d * e;
const g = x;
const h = new $regex_constructor( "foo", "g" );
const i = g / h;
const j = x;
const k = new $regex_constructor( "foo", "g" );
const l = j % k;
const m = x;
const n = new $regex_constructor( "foo", "g" );
const o = m + n;
const p = x;
const q = new $regex_constructor( "foo", "g" );
const r = p - q;
const s = x;
const t = new $regex_constructor( "foo", "g" );
const u = s << t;
const v = x;
const w = new $regex_constructor( "foo", "g" );
const y = v >> w;
const z = x;
const ba = new $regex_constructor( "foo", "g" );
const bb = z >>> ba;
const bc = x;
const bd = new $regex_constructor( "foo", "g" );
const be = bc < bd;
const bf = x;
const bg = new $regex_constructor( "foo", "g" );
const bh = bf > bg;
const bi = x;
const bj = new $regex_constructor( "foo", "g" );
const bk = bi <= bj;
const bl = x;
const bm = new $regex_constructor( "foo", "g" );
const bn = bl >= bm;
const bo = x;
const bp = new $regex_constructor( "foo", "g" );
const bq = bo == bp;
const br = x;
const bs = new $regex_constructor( "foo", "g" );
const bt = br != bs;
const bu = x;
const bv = new $regex_constructor( "foo", "g" );
const bw = x;
const bx = new $regex_constructor( "foo", "g" );
const by = x;
const bz = new $regex_constructor( "foo", "g" );
const ca = by & bz;
const cb = x;
const cc = new $regex_constructor( "foo", "g" );
const cd = cb ^ cc;
const ce = x;
const cf = new $regex_constructor( "foo", "g" );
const cg = ce | cf;
const ch = bu === bv;
const ci = bw !== bx;
const cj = [ c, f, i, l, o, r, u, y, bb, be, bh, bk, bn, bq, bt, ch, ci, ca, cd, cg ];
$( cj );
const ck = x;
const cl = new $regex_constructor( "foo", "g" );
const cm = ck in cl;
$( cm );
const cn = x;
const co = new $regex_constructor( "foo", "g" );
const cp = cn instanceof co;
$( cp );
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
