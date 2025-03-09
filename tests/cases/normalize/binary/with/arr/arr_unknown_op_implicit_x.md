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
const tmpCalleeParam$1 /*:array*/ = [];
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinLhs /*:array*/ = $Array_from(tmpCalleeParam);
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpCalleeParam$5 /*:array*/ = [];
const tmpCalleeParam$3 /*:unknown*/ = $(tmpCalleeParam$5);
const tmpBinLhs$1 /*:array*/ = $Array_from(tmpCalleeParam$3);
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpCalleeParam$9 /*:array*/ = [];
const tmpCalleeParam$7 /*:unknown*/ = $(tmpCalleeParam$9);
const tmpBinLhs$3 /*:array*/ = $Array_from(tmpCalleeParam$7);
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpCalleeParam$13 /*:array*/ = [];
const tmpCalleeParam$11 /*:unknown*/ = $(tmpCalleeParam$13);
const tmpBinLhs$5 /*:array*/ = $Array_from(tmpCalleeParam$11);
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpCalleeParam$17 /*:array*/ = [];
const tmpCalleeParam$15 /*:unknown*/ = $(tmpCalleeParam$17);
const tmpBinLhs$7 /*:array*/ = $Array_from(tmpCalleeParam$15);
const tmpArrElement$7 /*:primitive*/ = tmpBinLhs$7 + x;
const tmpCalleeParam$21 /*:array*/ = [];
const tmpCalleeParam$19 /*:unknown*/ = $(tmpCalleeParam$21);
const tmpBinLhs$9 /*:array*/ = $Array_from(tmpCalleeParam$19);
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpCalleeParam$25 /*:array*/ = [];
const tmpCalleeParam$23 /*:unknown*/ = $(tmpCalleeParam$25);
const tmpBinLhs$11 /*:array*/ = $Array_from(tmpCalleeParam$23);
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpCalleeParam$29 /*:array*/ = [];
const tmpCalleeParam$27 /*:unknown*/ = $(tmpCalleeParam$29);
const tmpBinLhs$13 /*:array*/ = $Array_from(tmpCalleeParam$27);
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpCalleeParam$33 /*:array*/ = [];
const tmpCalleeParam$31 /*:unknown*/ = $(tmpCalleeParam$33);
const tmpBinLhs$15 /*:array*/ = $Array_from(tmpCalleeParam$31);
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpCalleeParam$37 /*:array*/ = [];
const tmpCalleeParam$35 /*:unknown*/ = $(tmpCalleeParam$37);
const tmpBinLhs$17 /*:array*/ = $Array_from(tmpCalleeParam$35);
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpCalleeParam$41 /*:array*/ = [];
const tmpCalleeParam$39 /*:unknown*/ = $(tmpCalleeParam$41);
const tmpBinLhs$19 /*:array*/ = $Array_from(tmpCalleeParam$39);
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpCalleeParam$45 /*:array*/ = [];
const tmpCalleeParam$43 /*:unknown*/ = $(tmpCalleeParam$45);
const tmpBinLhs$21 /*:array*/ = $Array_from(tmpCalleeParam$43);
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpCalleeParam$49 /*:array*/ = [];
const tmpCalleeParam$47 /*:unknown*/ = $(tmpCalleeParam$49);
const tmpBinLhs$23 /*:array*/ = $Array_from(tmpCalleeParam$47);
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpCalleeParam$53 /*:array*/ = [];
const tmpCalleeParam$51 /*:unknown*/ = $(tmpCalleeParam$53);
const tmpBinLhs$25 /*:array*/ = $Array_from(tmpCalleeParam$51);
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpCalleeParam$57 /*:array*/ = [];
const tmpCalleeParam$55 /*:unknown*/ = $(tmpCalleeParam$57);
const tmpBinLhs$27 /*:array*/ = $Array_from(tmpCalleeParam$55);
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpCalleeParam$61 /*:array*/ = [];
const tmpCalleeParam$59 /*:unknown*/ = $(tmpCalleeParam$61);
const tmpBinLhs$29 /*:array*/ = $Array_from(tmpCalleeParam$59);
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpCalleeParam$65 /*:array*/ = [];
const tmpCalleeParam$63 /*:unknown*/ = $(tmpCalleeParam$65);
const tmpBinLhs$31 /*:array*/ = $Array_from(tmpCalleeParam$63);
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpCalleeParam$69 /*:array*/ = [];
const tmpCalleeParam$67 /*:unknown*/ = $(tmpCalleeParam$69);
const tmpBinLhs$33 /*:array*/ = $Array_from(tmpCalleeParam$67);
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpCalleeParam$73 /*:array*/ = [];
const tmpCalleeParam$71 /*:unknown*/ = $(tmpCalleeParam$73);
const tmpBinLhs$35 /*:array*/ = $Array_from(tmpCalleeParam$71);
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpCalleeParam$77 /*:array*/ = [];
const tmpCalleeParam$75 /*:unknown*/ = $(tmpCalleeParam$77);
const tmpBinLhs$37 /*:array*/ = $Array_from(tmpCalleeParam$75);
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpCalleeParam$81 /*:array*/ = [];
const tmpCalleeParam$79 /*:unknown*/ = $(tmpCalleeParam$81);
const tmpUnaryArg /*:array*/ = $Array_from(tmpCalleeParam$79);
const tmpArrElement$39 /*:number*/ = ~tmpUnaryArg;
const tmpCalleeParam$85 /*:array*/ = [];
const tmpCalleeParam$83 /*:unknown*/ = $(tmpCalleeParam$85);
$Array_from(tmpCalleeParam$83);
const tmpCalleeParam$89 /*:array*/ = [];
const tmpCalleeParam$87 /*:unknown*/ = $(tmpCalleeParam$89);
const tmpUnaryArg$3 /*:array*/ = $Array_from(tmpCalleeParam$87);
const tmpArrElement$43 /*:number*/ = -tmpUnaryArg$3;
const tmpCalleeParam$93 /*:array*/ = [];
const tmpCalleeParam$91 /*:unknown*/ = $(tmpCalleeParam$93);
const tmpUnaryArg$5 /*:array*/ = $Array_from(tmpCalleeParam$91);
const tmpArrElement$45 /*:number*/ = +tmpUnaryArg$5;
const tmpCalleeParam$97 /*:array*/ = [];
const tmpCalleeParam$95 /*:unknown*/ = $(tmpCalleeParam$97);
$Array_from(tmpCalleeParam$95);
const tmpCalleeParam$101 /*:array*/ = [];
const tmpCalleeParam$99 /*:unknown*/ = $(tmpCalleeParam$101);
$Array_from(tmpCalleeParam$99);
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
const tmpCalleeParam$105 /*:array*/ = [];
const tmpCalleeParam$103 /*:unknown*/ = $(tmpCalleeParam$105);
const tmpBinLhs$39 /*:array*/ = $Array_from(tmpCalleeParam$103);
const tmpArrElement$51 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpCalleeParam$109 /*:array*/ = [];
const tmpCalleeParam$107 /*:unknown*/ = $(tmpCalleeParam$109);
const tmpBinLhs$41 /*:array*/ = $Array_from(tmpCalleeParam$107);
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

## Pre Normal


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
  ~Array.from($([])),
  !Array.from($([])),
  -Array.from($([])),
  +Array.from($([])),
  typeof Array.from($([])),
  void Array.from($([])),
];
$(arr);
const arr2 = [Array.from($([])) in x, Array.from($([])) instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [];
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpBinLhs = $Array_from(tmpCalleeParam);
const tmpArrElement = tmpBinLhs ** x;
const tmpCalleeParam$5 = [];
const tmpCalleeParam$3 = $(tmpCalleeParam$5);
const tmpBinLhs$1 = $Array_from(tmpCalleeParam$3);
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpCalleeParam$9 = [];
const tmpCalleeParam$7 = $(tmpCalleeParam$9);
const tmpBinLhs$3 = $Array_from(tmpCalleeParam$7);
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpCalleeParam$13 = [];
const tmpCalleeParam$11 = $(tmpCalleeParam$13);
const tmpBinLhs$5 = $Array_from(tmpCalleeParam$11);
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpCalleeParam$17 = [];
const tmpCalleeParam$15 = $(tmpCalleeParam$17);
const tmpBinLhs$7 = $Array_from(tmpCalleeParam$15);
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpCalleeParam$21 = [];
const tmpCalleeParam$19 = $(tmpCalleeParam$21);
const tmpBinLhs$9 = $Array_from(tmpCalleeParam$19);
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpCalleeParam$25 = [];
const tmpCalleeParam$23 = $(tmpCalleeParam$25);
const tmpBinLhs$11 = $Array_from(tmpCalleeParam$23);
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpCalleeParam$29 = [];
const tmpCalleeParam$27 = $(tmpCalleeParam$29);
const tmpBinLhs$13 = $Array_from(tmpCalleeParam$27);
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpCalleeParam$33 = [];
const tmpCalleeParam$31 = $(tmpCalleeParam$33);
const tmpBinLhs$15 = $Array_from(tmpCalleeParam$31);
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpCalleeParam$37 = [];
const tmpCalleeParam$35 = $(tmpCalleeParam$37);
const tmpBinLhs$17 = $Array_from(tmpCalleeParam$35);
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpCalleeParam$41 = [];
const tmpCalleeParam$39 = $(tmpCalleeParam$41);
const tmpBinLhs$19 = $Array_from(tmpCalleeParam$39);
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpCalleeParam$45 = [];
const tmpCalleeParam$43 = $(tmpCalleeParam$45);
const tmpBinLhs$21 = $Array_from(tmpCalleeParam$43);
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpCalleeParam$49 = [];
const tmpCalleeParam$47 = $(tmpCalleeParam$49);
const tmpBinLhs$23 = $Array_from(tmpCalleeParam$47);
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpCalleeParam$53 = [];
const tmpCalleeParam$51 = $(tmpCalleeParam$53);
const tmpBinLhs$25 = $Array_from(tmpCalleeParam$51);
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpCalleeParam$57 = [];
const tmpCalleeParam$55 = $(tmpCalleeParam$57);
const tmpBinLhs$27 = $Array_from(tmpCalleeParam$55);
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpCalleeParam$61 = [];
const tmpCalleeParam$59 = $(tmpCalleeParam$61);
const tmpBinLhs$29 = $Array_from(tmpCalleeParam$59);
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpCalleeParam$65 = [];
const tmpCalleeParam$63 = $(tmpCalleeParam$65);
const tmpBinLhs$31 = $Array_from(tmpCalleeParam$63);
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpCalleeParam$69 = [];
const tmpCalleeParam$67 = $(tmpCalleeParam$69);
const tmpBinLhs$33 = $Array_from(tmpCalleeParam$67);
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpCalleeParam$73 = [];
const tmpCalleeParam$71 = $(tmpCalleeParam$73);
const tmpBinLhs$35 = $Array_from(tmpCalleeParam$71);
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpCalleeParam$77 = [];
const tmpCalleeParam$75 = $(tmpCalleeParam$77);
const tmpBinLhs$37 = $Array_from(tmpCalleeParam$75);
const tmpArrElement$37 = tmpBinLhs$37 | x;
const tmpCalleeParam$81 = [];
const tmpCalleeParam$79 = $(tmpCalleeParam$81);
const tmpUnaryArg = $Array_from(tmpCalleeParam$79);
const tmpArrElement$39 = ~tmpUnaryArg;
const tmpCalleeParam$85 = [];
const tmpCalleeParam$83 = $(tmpCalleeParam$85);
const tmpUnaryArg$1 = $Array_from(tmpCalleeParam$83);
const tmpArrElement$41 = !tmpUnaryArg$1;
const tmpCalleeParam$89 = [];
const tmpCalleeParam$87 = $(tmpCalleeParam$89);
const tmpUnaryArg$3 = $Array_from(tmpCalleeParam$87);
const tmpArrElement$43 = -tmpUnaryArg$3;
const tmpCalleeParam$93 = [];
const tmpCalleeParam$91 = $(tmpCalleeParam$93);
const tmpUnaryArg$5 = $Array_from(tmpCalleeParam$91);
const tmpArrElement$45 = +tmpUnaryArg$5;
const tmpCalleeParam$97 = [];
const tmpCalleeParam$95 = $(tmpCalleeParam$97);
const tmpUnaryArg$7 = $Array_from(tmpCalleeParam$95);
const tmpArrElement$47 = typeof tmpUnaryArg$7;
const tmpCalleeParam$101 = [];
const tmpCalleeParam$99 = $(tmpCalleeParam$101);
$Array_from(tmpCalleeParam$99);
const tmpArrElement$49 = undefined;
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
  tmpArrElement$39,
  tmpArrElement$41,
  tmpArrElement$43,
  tmpArrElement$45,
  tmpArrElement$47,
  tmpArrElement$49,
];
$(arr);
const tmpCalleeParam$105 = [];
const tmpCalleeParam$103 = $(tmpCalleeParam$105);
const tmpBinLhs$39 = $Array_from(tmpCalleeParam$103);
const tmpArrElement$51 = tmpBinLhs$39 in x;
const tmpCalleeParam$109 = [];
const tmpCalleeParam$107 = $(tmpCalleeParam$109);
const tmpBinLhs$41 = $Array_from(tmpCalleeParam$107);
const tmpArrElement$53 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$51, tmpArrElement$53];
$(arr2);
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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_from
