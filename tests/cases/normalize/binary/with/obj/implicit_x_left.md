# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > Obj > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  x ** {},
  x * {},
  x / {},
  x % {},
  x + {},
  x - {},
  x << {},
  x >> {},
  x >>> {},
  x < {},
  x > {},
  x <= {},
  x >= {},
  x == {},
  x != {},
  x === {},
  x !== {},
  x & {},
  x ^ {},
  x | {},
];
$(arr);
$(x in {});
$(x instanceof {});
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = x;
const tmpBinBothRhs /*:object*/ /*truthy*/ = {};
const tmpArrElement /*:number*/ = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 /*:unknown*/ = x;
const tmpBinBothRhs$1 /*:object*/ /*truthy*/ = {};
const tmpArrElement$1 /*:number*/ = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 /*:unknown*/ = x;
const tmpBinBothRhs$3 /*:object*/ /*truthy*/ = {};
const tmpArrElement$3 /*:number*/ = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 /*:unknown*/ = x;
const tmpBinBothRhs$5 /*:object*/ /*truthy*/ = {};
const tmpArrElement$5 /*:number*/ = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 /*:unknown*/ = x;
const tmpBinBothRhs$7 /*:object*/ /*truthy*/ = {};
const tmpArrElement$7 /*:primitive*/ = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 /*:unknown*/ = x;
const tmpBinBothRhs$9 /*:object*/ /*truthy*/ = {};
const tmpArrElement$9 /*:number*/ = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 /*:unknown*/ = x;
const tmpBinBothRhs$11 /*:object*/ /*truthy*/ = {};
const tmpArrElement$11 /*:number*/ = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 /*:unknown*/ = x;
const tmpBinBothRhs$13 /*:object*/ /*truthy*/ = {};
const tmpArrElement$13 /*:number*/ = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 /*:unknown*/ = x;
const tmpBinBothRhs$15 /*:object*/ /*truthy*/ = {};
const tmpArrElement$15 /*:number*/ = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 /*:unknown*/ = x;
const tmpBinBothRhs$17 /*:object*/ /*truthy*/ = {};
const tmpArrElement$17 /*:boolean*/ = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 /*:unknown*/ = x;
const tmpBinBothRhs$19 /*:object*/ /*truthy*/ = {};
const tmpArrElement$19 /*:boolean*/ = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 /*:unknown*/ = x;
const tmpBinBothRhs$21 /*:object*/ /*truthy*/ = {};
const tmpArrElement$21 /*:boolean*/ = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 /*:unknown*/ = x;
const tmpBinBothRhs$23 /*:object*/ /*truthy*/ = {};
const tmpArrElement$23 /*:boolean*/ = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 /*:unknown*/ = x;
const tmpBinBothRhs$25 /*:object*/ /*truthy*/ = {};
const tmpArrElement$25 /*:boolean*/ = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 /*:unknown*/ = x;
const tmpBinBothRhs$27 /*:object*/ /*truthy*/ = {};
const tmpArrElement$27 /*:boolean*/ = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 /*:unknown*/ = x;
x;
const tmpBinBothRhs$33 /*:object*/ /*truthy*/ = {};
const tmpArrElement$33 /*:number*/ = tmpBinBothLhs$29 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 /*:unknown*/ = x;
const tmpBinBothRhs$35 /*:object*/ /*truthy*/ = {};
const tmpArrElement$35 /*:number*/ = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 /*:unknown*/ = x;
const tmpBinBothRhs$37 /*:object*/ /*truthy*/ = {};
const tmpArrElement$37 /*:number*/ = tmpBinBothLhs$37 | tmpBinBothRhs$37;
const tmpBinBothRhs$29 /*:object*/ /*truthy*/ = {};
const tmpBinBothRhs$31 /*:object*/ /*truthy*/ = {};
const tmpArrElement$29 /*:boolean*/ = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpArrElement$31 /*:boolean*/ = tmpBinBothLhs$29 !== tmpBinBothRhs$31;
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
const tmpBinBothLhs$39 /*:unknown*/ = x;
const tmpBinBothRhs$39 /*:object*/ /*truthy*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs$39 in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothLhs$41 /*:unknown*/ = x;
const tmpBinBothRhs$41 /*:object*/ /*truthy*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** {};
const tmpArrElement$1 = x * {};
const tmpArrElement$3 = x / {};
const tmpArrElement$5 = x % {};
const tmpArrElement$7 = x + {};
const tmpArrElement$9 = x - {};
const tmpArrElement$11 = x << {};
const tmpArrElement$13 = x >> {};
const tmpArrElement$15 = x >>> {};
const tmpArrElement$17 = x < {};
const tmpArrElement$19 = x > {};
const tmpArrElement$21 = x <= {};
const tmpArrElement$23 = x >= {};
const tmpArrElement$25 = x == {};
const tmpArrElement$27 = x != {};
const tmpBinBothLhs$29 = x;
x;
const tmpArrElement$33 = tmpBinBothLhs$29 & {};
const tmpArrElement$35 = x ^ {};
const tmpArrElement$37 = x | {};
const tmpBinBothRhs$29 = {};
const tmpBinBothRhs$31 = {};
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpArrElement$31 = tmpBinBothLhs$29 !== tmpBinBothRhs$31;
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
$(tmpBinBothLhs$39 in {});
const tmpBinBothLhs$41 = x;
$(tmpBinBothLhs$41 instanceof {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x;
const b = {};
const c = a ** b;
const d = x;
const e = {};
const f = d * e;
const g = x;
const h = {};
const i = g / h;
const j = x;
const k = {};
const l = j % k;
const m = x;
const n = {};
const o = m + n;
const p = x;
const q = {};
const r = p - q;
const s = x;
const t = {};
const u = s << t;
const v = x;
const w = {};
const y = v >> w;
const z = x;
const ba = {};
const bb = z >>> ba;
const bc = x;
const bd = {};
const be = bc < bd;
const bf = x;
const bg = {};
const bh = bf > bg;
const bi = x;
const bj = {};
const bk = bi <= bj;
const bl = x;
const bm = {};
const bn = bl >= bm;
const bo = x;
const bp = {};
const bq = bo == bp;
const br = x;
const bs = {};
const bt = br != bs;
const bu = x;
x;
const bv = {};
const bw = bu & bv;
const bx = x;
const by = {};
const bz = bx ^ by;
const ca = x;
const cb = {};
const cc = ca | cb;
const cd = {};
const ce = {};
const cf = bu === cd;
const cg = bu !== ce;
const ch = [ c, f, i, l, o, r, u, y, bb, be, bh, bk, bn, bq, bt, cf, cg, bw, bz, cc ];
$( ch );
const ci = x;
const cj = {};
const ck = ci in cj;
$( ck );
const cl = x;
const cm = {};
const cn = cl instanceof cm;
$( cn );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = x;
const tmpBinBothRhs = {};
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = {};
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = {};
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = {};
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = {};
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = {};
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = {};
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = {};
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = {};
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = {};
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = {};
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = {};
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = {};
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = {};
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = {};
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = {};
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = {};
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = {};
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = {};
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = {};
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
const tmpBinBothRhs$39 = {};
let tmpCalleeParam = tmpBinBothLhs$39 in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = {};
let tmpCalleeParam$1 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
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
