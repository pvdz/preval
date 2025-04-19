# Preval test case

# arr_unknown_op_implicit_x.md

> Normalize > Binary > With > Arr > Arr unknown op implicit x
>
> Deal with certain primitive with binary ops

In this variant we only tell preval that the value is an array
but it won't know the actual value of the array so it's purely
type based transforms.
This is different from the literal case because those can be
resolved, and at some point hopefully it will.

## Options

- globals: x
- loopProtectLimit=1000

## Input

`````js filename=intro
const arr = [
  Array.from($([])) ** x,
  Array.from($([])) * x,
  Array.from($([])) / x,
  Array.from($([])) % x,
  Array.from($([])) + x,
  Array.from($([])) - x,
  Array.from($([])) << x,
  Array.from($([])) >> x,
  Array.from($([])) >>> x,
  Array.from($([])) < x,
  Array.from($([])) > x,
  Array.from($([])) <= x,
  Array.from($([])) >= x,
  Array.from($([])) == x,
  Array.from($([])) != x,
  Array.from($([])) === x,
  Array.from($([])) !== x,
  Array.from($([])) & x,
  Array.from($([])) ^ x,
  Array.from($([])) | x,

  ~ Array.from($([])),
  ! Array.from($([])),
  - Array.from($([])),
  + Array.from($([])),
  typeof Array.from($([])),
  void Array.from($([])),
];
$(arr);

const arr2 = [
  Array.from($([])) in x,
  Array.from($([])) instanceof x,
];
$(arr2);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const tmpMCP /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:array*/ = $Array_from(tmpMCP);
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpCalleeParam$1 /*:array*/ = [];
const tmpMCP$1 /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinLhs$1 /*:array*/ = $Array_from(tmpMCP$1);
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpCalleeParam$3 /*:array*/ = [];
const tmpMCP$3 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpBinLhs$3 /*:array*/ = $Array_from(tmpMCP$3);
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpCalleeParam$5 /*:array*/ = [];
const tmpMCP$5 /*:unknown*/ = $(tmpCalleeParam$5);
const tmpBinLhs$5 /*:array*/ = $Array_from(tmpMCP$5);
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpCalleeParam$7 /*:array*/ = [];
const tmpMCP$7 /*:unknown*/ = $(tmpCalleeParam$7);
const tmpBinLhs$7 /*:array*/ = $Array_from(tmpMCP$7);
const tmpArrElement$7 /*:primitive*/ = tmpBinLhs$7 + x;
const tmpCalleeParam$9 /*:array*/ = [];
const tmpMCP$9 /*:unknown*/ = $(tmpCalleeParam$9);
const tmpBinLhs$9 /*:array*/ = $Array_from(tmpMCP$9);
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpCalleeParam$11 /*:array*/ = [];
const tmpMCP$11 /*:unknown*/ = $(tmpCalleeParam$11);
const tmpBinLhs$11 /*:array*/ = $Array_from(tmpMCP$11);
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpCalleeParam$13 /*:array*/ = [];
const tmpMCP$13 /*:unknown*/ = $(tmpCalleeParam$13);
const tmpBinLhs$13 /*:array*/ = $Array_from(tmpMCP$13);
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpCalleeParam$15 /*:array*/ = [];
const tmpMCP$15 /*:unknown*/ = $(tmpCalleeParam$15);
const tmpBinLhs$15 /*:array*/ = $Array_from(tmpMCP$15);
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpCalleeParam$17 /*:array*/ = [];
const tmpMCP$17 /*:unknown*/ = $(tmpCalleeParam$17);
const tmpBinLhs$17 /*:array*/ = $Array_from(tmpMCP$17);
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpCalleeParam$19 /*:array*/ = [];
const tmpMCP$19 /*:unknown*/ = $(tmpCalleeParam$19);
const tmpBinLhs$19 /*:array*/ = $Array_from(tmpMCP$19);
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpCalleeParam$21 /*:array*/ = [];
const tmpMCP$21 /*:unknown*/ = $(tmpCalleeParam$21);
const tmpBinLhs$21 /*:array*/ = $Array_from(tmpMCP$21);
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpCalleeParam$23 /*:array*/ = [];
const tmpMCP$23 /*:unknown*/ = $(tmpCalleeParam$23);
const tmpBinLhs$23 /*:array*/ = $Array_from(tmpMCP$23);
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpCalleeParam$25 /*:array*/ = [];
const tmpMCP$25 /*:unknown*/ = $(tmpCalleeParam$25);
const tmpBinLhs$25 /*:array*/ = $Array_from(tmpMCP$25);
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpCalleeParam$27 /*:array*/ = [];
const tmpMCP$27 /*:unknown*/ = $(tmpCalleeParam$27);
const tmpBinLhs$27 /*:array*/ = $Array_from(tmpMCP$27);
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpCalleeParam$29 /*:array*/ = [];
const tmpMCP$29 /*:unknown*/ = $(tmpCalleeParam$29);
const tmpBinLhs$29 /*:array*/ = $Array_from(tmpMCP$29);
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpCalleeParam$31 /*:array*/ = [];
const tmpMCP$31 /*:unknown*/ = $(tmpCalleeParam$31);
const tmpBinLhs$31 /*:array*/ = $Array_from(tmpMCP$31);
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpCalleeParam$33 /*:array*/ = [];
const tmpMCP$33 /*:unknown*/ = $(tmpCalleeParam$33);
const tmpBinLhs$33 /*:array*/ = $Array_from(tmpMCP$33);
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpCalleeParam$35 /*:array*/ = [];
const tmpMCP$35 /*:unknown*/ = $(tmpCalleeParam$35);
const tmpBinLhs$35 /*:array*/ = $Array_from(tmpMCP$35);
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpCalleeParam$37 /*:array*/ = [];
const tmpMCP$37 /*:unknown*/ = $(tmpCalleeParam$37);
const tmpBinLhs$37 /*:array*/ = $Array_from(tmpMCP$37);
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpCalleeParam$39 /*:array*/ = [];
const tmpMCP$39 /*:unknown*/ = $(tmpCalleeParam$39);
const tmpUnaryArg /*:array*/ = $Array_from(tmpMCP$39);
const tmpArrElement$39 /*:number*/ = ~tmpUnaryArg;
const tmpCalleeParam$41 /*:array*/ = [];
const tmpMCP$41 /*:unknown*/ = $(tmpCalleeParam$41);
$Array_from(tmpMCP$41);
const tmpCalleeParam$43 /*:array*/ = [];
const tmpMCP$43 /*:unknown*/ = $(tmpCalleeParam$43);
const tmpUnaryArg$3 /*:array*/ = $Array_from(tmpMCP$43);
const tmpArrElement$43 /*:number*/ = -tmpUnaryArg$3;
const tmpCalleeParam$45 /*:array*/ = [];
const tmpMCP$45 /*:unknown*/ = $(tmpCalleeParam$45);
const tmpUnaryArg$5 /*:array*/ = $Array_from(tmpMCP$45);
const tmpArrElement$45 /*:number*/ = +tmpUnaryArg$5;
const tmpCalleeParam$47 /*:array*/ = [];
const tmpMCP$47 /*:unknown*/ = $(tmpCalleeParam$47);
$Array_from(tmpMCP$47);
const tmpCalleeParam$49 /*:array*/ = [];
const tmpMCP$49 /*:unknown*/ = $(tmpCalleeParam$49);
$Array_from(tmpMCP$49);
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
  tmpArrElement$39,
  false,
  tmpArrElement$43,
  tmpArrElement$45,
  `object`,
  undefined,
];
$(arr);
const tmpCalleeParam$51 /*:array*/ = [];
const tmpMCP$51 /*:unknown*/ = $(tmpCalleeParam$51);
const tmpBinLhs$39 /*:array*/ = $Array_from(tmpMCP$51);
const tmpArrElement$51 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpCalleeParam$53 /*:array*/ = [];
const tmpMCP$53 /*:unknown*/ = $(tmpCalleeParam$53);
const tmpBinLhs$41 /*:array*/ = $Array_from(tmpMCP$53);
const tmpArrElement$53 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$51, tmpArrElement$53];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $Array_from($([])) ** x;
const tmpArrElement$1 = $Array_from($([])) * x;
const tmpArrElement$3 = $Array_from($([])) / x;
const tmpArrElement$5 = $Array_from($([])) % x;
const tmpArrElement$7 = $Array_from($([])) + x;
const tmpArrElement$9 = $Array_from($([])) - x;
const tmpArrElement$11 = $Array_from($([])) << x;
const tmpArrElement$13 = $Array_from($([])) >> x;
const tmpArrElement$15 = $Array_from($([])) >>> x;
const tmpArrElement$17 = $Array_from($([])) < x;
const tmpArrElement$19 = $Array_from($([])) > x;
const tmpArrElement$21 = $Array_from($([])) <= x;
const tmpArrElement$23 = $Array_from($([])) >= x;
const tmpArrElement$25 = $Array_from($([])) == x;
const tmpArrElement$27 = $Array_from($([])) != x;
const tmpArrElement$29 = $Array_from($([])) === x;
const tmpArrElement$31 = $Array_from($([])) !== x;
const tmpArrElement$33 = $Array_from($([])) & x;
const tmpArrElement$35 = $Array_from($([])) ^ x;
const tmpArrElement$37 = $Array_from($([])) | x;
const tmpUnaryArg = $Array_from($([]));
const tmpArrElement$39 = ~tmpUnaryArg;
$Array_from($([]));
const tmpUnaryArg$3 = $Array_from($([]));
const tmpArrElement$43 = -tmpUnaryArg$3;
const tmpUnaryArg$5 = $Array_from($([]));
const tmpArrElement$45 = +tmpUnaryArg$5;
$Array_from($([]));
$Array_from($([]));
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
  tmpArrElement$39,
  false,
  tmpArrElement$43,
  tmpArrElement$45,
  `object`,
  undefined,
]);
const tmpArrElement$51 = $Array_from($([])) in x;
const tmpArrElement$53 = $Array_from($([])) instanceof x;
$([tmpArrElement$51, tmpArrElement$53]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $Array_from( b );
const d = c ** x;
const e = [];
const f = $( e );
const g = $Array_from( f );
const h = g * x;
const i = [];
const j = $( i );
const k = $Array_from( j );
const l = k / x;
const m = [];
const n = $( m );
const o = $Array_from( n );
const p = o % x;
const q = [];
const r = $( q );
const s = $Array_from( r );
const t = s + x;
const u = [];
const v = $( u );
const w = $Array_from( v );
const y = w - x;
const z = [];
const ba = $( z );
const bb = $Array_from( ba );
const bc = bb << x;
const bd = [];
const be = $( bd );
const bf = $Array_from( be );
const bg = bf >> x;
const bh = [];
const bi = $( bh );
const bj = $Array_from( bi );
const bk = bj >>> x;
const bl = [];
const bm = $( bl );
const bn = $Array_from( bm );
const bo = bn < x;
const bp = [];
const bq = $( bp );
const br = $Array_from( bq );
const bs = br > x;
const bt = [];
const bu = $( bt );
const bv = $Array_from( bu );
const bw = bv <= x;
const bx = [];
const by = $( bx );
const bz = $Array_from( by );
const ca = bz >= x;
const cb = [];
const cc = $( cb );
const cd = $Array_from( cc );
const ce = cd == x;
const cf = [];
const cg = $( cf );
const ch = $Array_from( cg );
const ci = ch != x;
const cj = [];
const ck = $( cj );
const cl = $Array_from( ck );
const cm = cl === x;
const cn = [];
const co = $( cn );
const cp = $Array_from( co );
const cq = cp !== x;
const cr = [];
const cs = $( cr );
const ct = $Array_from( cs );
const cu = ct & x;
const cv = [];
const cw = $( cv );
const cx = $Array_from( cw );
const cy = cx ^ x;
const cz = [];
const da = $( cz );
const db = $Array_from( da );
const dc = db | x;
const dd = [];
const de = $( dd );
const df = $Array_from( de );
const dg = ~df;
const dh = [];
const di = $( dh );
$Array_from( di );
const dj = [];
const dk = $( dj );
const dl = $Array_from( dk );
const dm = -dl;
const dn = [];
const dp = $( dn );
const dq = $Array_from( dp );
const dr = +dq;
const ds = [];
const dt = $( ds );
$Array_from( dt );
const du = [];
const dv = $( du );
$Array_from( dv );
const dw = [ d, h, l, p, t, y, bc, bg, bk, bo, bs, bw, ca, ce, ci, cm, cq, cu, cy, dc, dg, false, dm, dr, "object", undefined ];
$( dw );
const dx = [];
const dy = $( dx );
const dz = $Array_from( dy );
const ea = dz in x;
const eb = [];
const ec = $( eb );
const ed = $Array_from( ec );
const ee = ed instanceof x;
const ef = [ ea, ee ];
$( ef );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
