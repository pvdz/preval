# Preval test case

# spy_right.md

> Normalize > Binary > With > Obj > Spy right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  {} ** x,
  {} * x,
  {} / x,
  {} % x,
  {} + x,
  {} - x,
  {} << x,
  {} >> x,
  {} >>> x,
  {} < x,
  {} > x,
  {} <= x,
  {} >= x,
  {} == x,
  {} != x,
  {} === x,
  {} !== x,
  {} & x,
  {} ^ x,
  {} | x,
];
$(arr);
$({} in x);
$({} instanceof x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpBinLhs /*:object*/ = {};
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:object*/ = {};
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:object*/ = {};
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:object*/ = {};
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpBinLhs$7 /*:object*/ = {};
const tmpArrElement$7 /*:primitive*/ = tmpBinLhs$7 + x;
const tmpBinLhs$9 /*:object*/ = {};
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:object*/ = {};
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:object*/ = {};
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:object*/ = {};
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:object*/ = {};
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:object*/ = {};
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:object*/ = {};
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:object*/ = {};
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:object*/ = {};
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:object*/ = {};
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpBinLhs$33 /*:object*/ = {};
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:object*/ = {};
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:object*/ = {};
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpBinLhs$29 /*:object*/ = {};
const tmpBinLhs$31 /*:object*/ = {};
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
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
const tmpBinLhs$39 /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 /*:object*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = {} ** x;
const tmpArrElement$1 = {} * x;
const tmpArrElement$3 = {} / x;
const tmpArrElement$5 = {} % x;
const tmpArrElement$7 = {} + x;
const tmpArrElement$9 = {} - x;
const tmpArrElement$11 = {} << x;
const tmpArrElement$13 = {} >> x;
const tmpArrElement$15 = {} >>> x;
const tmpArrElement$17 = {} < x;
const tmpArrElement$19 = {} > x;
const tmpArrElement$21 = {} <= x;
const tmpArrElement$23 = {} >= x;
const tmpArrElement$25 = {} == x;
const tmpArrElement$27 = {} != x;
const tmpArrElement$33 = {} & x;
const tmpArrElement$35 = {} ^ x;
const tmpArrElement$37 = {} | x;
const tmpBinLhs$29 = {};
const tmpBinLhs$31 = {};
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpArrElement$31 = tmpBinLhs$31 !== x;
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
$({} in x);
$({} instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = $spy();
const arr = [
  {} ** x,
  {} * x,
  {} / x,
  {} % x,
  {} + x,
  {} - x,
  {} << x,
  {} >> x,
  {} >>> x,
  {} < x,
  {} > x,
  {} <= x,
  {} >= x,
  {} == x,
  {} != x,
  {} === x,
  {} !== x,
  {} & x,
  {} ^ x,
  {} | x,
];
$(arr);
$({} in x);
$({} instanceof x);
`````

## Normalized


`````js filename=intro
const x = $spy();
const tmpBinLhs = {};
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = {};
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = {};
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = {};
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = {};
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = {};
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = {};
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = {};
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = {};
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = {};
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = {};
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = {};
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = {};
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = {};
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = {};
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = {};
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = {};
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = {};
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = {};
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = {};
const tmpArrElement$37 = tmpBinLhs$37 | x;
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
const tmpBinLhs$39 = {};
const tmpCalleeParam = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 = {};
const tmpCalleeParam$1 = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = {};
const c = b ** a;
const d = {};
const e = d * a;
const f = {};
const g = f / a;
const h = {};
const i = h % a;
const j = {};
const k = j + a;
const l = {};
const m = l - a;
const n = {};
const o = n << a;
const p = {};
const q = p >> a;
const r = {};
const s = r >>> a;
const t = {};
const u = t < a;
const v = {};
const w = v > a;
const x = {};
const y = x <= a;
const z = {};
const ba = z >= a;
const bb = {};
const bc = bb == a;
const bd = {};
const be = bd != a;
const bf = {};
const bg = bf & a;
const bh = {};
const bi = bh ^ a;
const bj = {};
const bk = bj | a;
const bl = {};
const bm = {};
const bn = bl === a;
const bo = bm !== a;
const bp = [ c, e, g, i, k, m, o, q, s, u, w, y, ba, bc, be, bn, bo, bg, bi, bk ];
$( bp );
const bq = {};
const br = bq in a;
$( br );
const bs = {};
const bt = bs instanceof a;
$( bt );
`````

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
 - 18: [NaN, NaN, NaN, NaN, '[object Object]12345', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 12345, 12345]
 - 19: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
