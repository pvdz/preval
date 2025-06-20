# Preval test case

# unknown_string_left.md

> Normalize > Binary > With > Regex > Unknown string left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $('ok');

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
const tmpBinBothRhs /*:unknown*/ = $(`ok`);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpBinBothRhs$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 /*:string*/ = x + tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpBinBothRhs$35 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$39;
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothRhs$41 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$41;
$(tmpCalleeParam);
const tmpBinBothRhs$43 /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, `g`);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(`ok`), `plustr`);
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
const tmpArrElement$33 = x & new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = x ^ new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = x | new $regex_constructor(`foo`, `g`);
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
  false,
  true,
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
const a = $( "ok" );
const b = $coerce( a, "plustr" );
const c = new $regex_constructor( "foo", "g" );
const d = b ** c;
const e = new $regex_constructor( "foo", "g" );
const f = b * e;
const g = new $regex_constructor( "foo", "g" );
const h = b / g;
const i = new $regex_constructor( "foo", "g" );
const j = b % i;
const k = new $regex_constructor( "foo", "g" );
const l = b + k;
const m = new $regex_constructor( "foo", "g" );
const n = b - m;
const o = new $regex_constructor( "foo", "g" );
const p = b << o;
const q = new $regex_constructor( "foo", "g" );
const r = b >> q;
const s = new $regex_constructor( "foo", "g" );
const t = b >>> s;
const u = new $regex_constructor( "foo", "g" );
const v = b < u;
const w = new $regex_constructor( "foo", "g" );
const x = b > w;
const y = new $regex_constructor( "foo", "g" );
const z = b <= y;
const ba = new $regex_constructor( "foo", "g" );
const bb = b >= ba;
const bc = new $regex_constructor( "foo", "g" );
const bd = b == bc;
const be = new $regex_constructor( "foo", "g" );
const bf = b != be;
const bg = new $regex_constructor( "foo", "g" );
const bh = b & bg;
const bi = new $regex_constructor( "foo", "g" );
const bj = b ^ bi;
const bk = new $regex_constructor( "foo", "g" );
const bl = b | bk;
const bm = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, bd, bf, false, true, bh, bj, bl ];
$( bm );
const bn = new $regex_constructor( "foo", "g" );
const bo = b in bn;
$( bo );
const bp = new $regex_constructor( "foo", "g" );
const bq = b instanceof bp;
$( bq );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(`ok`);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = new $regex_constructor(`foo`, `g`);
const tmpArrElement = tmpBinBothLhs$1 ** tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$1 = tmpBinBothLhs$3 * tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$3 = tmpBinBothLhs$5 / tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$5 = tmpBinBothLhs$7 % tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$9 = tmpBinBothLhs$11 - tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$11 = tmpBinBothLhs$13 << tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$13 = tmpBinBothLhs$15 >> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$15 = tmpBinBothLhs$17 >>> tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$17 = tmpBinBothLhs$19 < tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$19 = tmpBinBothLhs$21 > tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$21 = tmpBinBothLhs$23 <= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$23 = tmpBinBothLhs$25 >= tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$25 = tmpBinBothLhs$27 == tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$27 = tmpBinBothLhs$29 != tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$29 = tmpBinBothLhs$31 === tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$31 = tmpBinBothLhs$33 !== tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$33 = tmpBinBothLhs$35 & tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$35 = tmpBinBothLhs$37 ^ tmpBinBothRhs$37;
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = new $regex_constructor(`foo`, `g`);
const tmpArrElement$37 = tmpBinBothLhs$39 | tmpBinBothRhs$39;
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
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam = tmpBinBothLhs$41 in tmpBinBothRhs$41;
$(tmpCalleeParam);
const tmpBinBothLhs$43 = x;
const tmpBinBothRhs$43 = new $regex_constructor(`foo`, `g`);
let tmpCalleeParam$1 = tmpBinBothLhs$43 instanceof tmpBinBothRhs$43;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: [NaN, NaN, NaN, NaN, 'ok/foo/g', NaN, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 0, 0]
 - 3: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
