# Preval test case

# spy_left.md

> Normalize > Binary > With > Obj > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
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
const x /*:unknown*/ = $spy();
const tmpBinBothRhs /*:object*/ /*truthy*/ = {};
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 /*:object*/ /*truthy*/ = {};
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:object*/ /*truthy*/ = {};
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:object*/ /*truthy*/ = {};
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:object*/ /*truthy*/ = {};
const tmpArrElement$7 /*:primitive*/ = x + tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:object*/ /*truthy*/ = {};
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:object*/ /*truthy*/ = {};
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:object*/ /*truthy*/ = {};
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:object*/ /*truthy*/ = {};
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:object*/ /*truthy*/ = {};
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:object*/ /*truthy*/ = {};
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:object*/ /*truthy*/ = {};
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:object*/ /*truthy*/ = {};
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:object*/ /*truthy*/ = {};
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:object*/ /*truthy*/ = {};
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$27;
const tmpBinBothRhs$33 /*:object*/ /*truthy*/ = {};
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 /*:object*/ /*truthy*/ = {};
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:object*/ /*truthy*/ = {};
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$37;
const tmpBinBothRhs$29 /*:object*/ /*truthy*/ = {};
const tmpBinBothRhs$31 /*:object*/ /*truthy*/ = {};
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
const tmpBinBothRhs$39 /*:object*/ /*truthy*/ = {};
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothRhs$41 /*:object*/ /*truthy*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
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
const tmpArrElement$33 = x & {};
const tmpArrElement$35 = x ^ {};
const tmpArrElement$37 = x | {};
const tmpBinBothRhs$29 = {};
const tmpBinBothRhs$31 = {};
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
$(x in {});
$(x instanceof {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = {};
const c = a ** b;
const d = {};
const e = a * d;
const f = {};
const g = a / f;
const h = {};
const i = a % h;
const j = {};
const k = a + j;
const l = {};
const m = a - l;
const n = {};
const o = a << n;
const p = {};
const q = a >> p;
const r = {};
const s = a >>> r;
const t = {};
const u = a < t;
const v = {};
const w = a > v;
const x = {};
const y = a <= x;
const z = {};
const ba = a >= z;
const bb = {};
const bc = a == bb;
const bd = {};
const be = a != bd;
const bf = {};
const bg = a & bf;
const bh = {};
const bi = a ^ bh;
const bj = {};
const bk = a | bj;
const bl = {};
const bm = {};
const bn = a === bl;
const bo = a !== bm;
const bp = [ c, e, g, i, k, m, o, q, s, u, w, y, ba, bc, be, bn, bo, bg, bi, bk ];
$( bp );
const bq = {};
const br = a in bq;
$( br );
const bs = {};
const bt = a instanceof bs;
$( bt );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy();
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
 - 18: 
  [
    NaN,
    NaN,
    NaN,
    NaN,
    '12345[object Object]',
    NaN,
    12345,
    12345,
    12345,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    0,
    12345,
    12345,
  ],

 - 19: '$spy[1].toString()'
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
