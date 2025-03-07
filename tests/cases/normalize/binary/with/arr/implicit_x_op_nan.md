# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Arr > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
];
$(arr);

const arr2 = [
  x in [],
  x instanceof [],
];
$(arr2);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = x;
const tmpBinBothRhs /*:array*/ = [];
const tmpArrElement /*:number*/ = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 /*:unknown*/ = x;
const tmpBinBothRhs$1 /*:array*/ = [];
const tmpArrElement$1 /*:number*/ = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 /*:unknown*/ = x;
const tmpBinBothRhs$3 /*:array*/ = [];
const tmpArrElement$3 /*:number*/ = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 /*:unknown*/ = x;
const tmpBinBothRhs$5 /*:array*/ = [];
const tmpArrElement$5 /*:number*/ = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 /*:unknown*/ = x;
const tmpArrElement$7 /*:string*/ = $coerce(tmpBinBothLhs$7, `plustr`);
const tmpBinBothLhs$9 /*:unknown*/ = x;
const tmpBinBothRhs$9 /*:array*/ = [];
const tmpArrElement$9 /*:number*/ = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 /*:unknown*/ = x;
const tmpBinBothRhs$11 /*:array*/ = [];
const tmpArrElement$11 /*:number*/ = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 /*:unknown*/ = x;
const tmpBinBothRhs$13 /*:array*/ = [];
const tmpArrElement$13 /*:number*/ = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 /*:unknown*/ = x;
const tmpBinBothRhs$15 /*:array*/ = [];
const tmpArrElement$15 /*:number*/ = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 /*:unknown*/ = x;
const tmpBinBothRhs$17 /*:array*/ = [];
const tmpArrElement$17 /*:boolean*/ = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 /*:unknown*/ = x;
const tmpBinBothRhs$19 /*:array*/ = [];
const tmpArrElement$19 /*:boolean*/ = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 /*:unknown*/ = x;
const tmpBinBothRhs$21 /*:array*/ = [];
const tmpArrElement$21 /*:boolean*/ = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 /*:unknown*/ = x;
const tmpBinBothRhs$23 /*:array*/ = [];
const tmpArrElement$23 /*:boolean*/ = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 /*:unknown*/ = x;
const tmpBinBothLhs$27 /*:unknown*/ = x;
const tmpBinBothLhs$29 /*:unknown*/ = x;
const tmpBinBothLhs$31 /*:unknown*/ = x;
const tmpBinBothLhs$33 /*:unknown*/ = x;
const tmpBinBothRhs$33 /*:array*/ = [];
const tmpArrElement$33 /*:number*/ = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 /*:unknown*/ = x;
const tmpBinBothRhs$35 /*:array*/ = [];
const tmpArrElement$35 /*:number*/ = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 /*:unknown*/ = x;
const tmpBinBothRhs$37 /*:array*/ = [];
const tmpArrElement$37 /*:number*/ = tmpBinBothLhs$37 | tmpBinBothRhs$37;
const tmpBinBothRhs$25 /*:array*/ = [];
const tmpBinBothRhs$27 /*:array*/ = [];
const tmpBinBothRhs$29 /*:array*/ = [];
const tmpBinBothRhs$31 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothLhs$25 === tmpBinBothRhs$25;
const tmpArrElement$27 /*:boolean*/ = tmpBinBothLhs$27 !== tmpBinBothRhs$27;
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
const tmpBinBothLhs$41 /*:unknown*/ = x;
const tmpBinBothRhs$39 /*:array*/ = [];
const tmpBinBothRhs$41 /*:array*/ = [];
const tmpArrElement$39 /*:boolean*/ = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 /*:boolean*/ = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** [];
const tmpArrElement$1 = x * [];
const tmpArrElement$3 = x / [];
const tmpArrElement$5 = x % [];
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpArrElement$9 = x - [];
const tmpArrElement$11 = x << [];
const tmpArrElement$13 = x >> [];
const tmpArrElement$15 = x >>> [];
const tmpArrElement$17 = x < [];
const tmpArrElement$19 = x > [];
const tmpArrElement$21 = x <= [];
const tmpArrElement$23 = x >= [];
const tmpBinBothLhs$25 = x;
const tmpBinBothLhs$27 = x;
const tmpBinBothLhs$29 = x;
const tmpBinBothLhs$31 = x;
const tmpArrElement$33 = x & [];
const tmpArrElement$35 = x ^ [];
const tmpArrElement$37 = x | [];
const tmpBinBothRhs$25 = [];
const tmpBinBothRhs$27 = [];
const tmpBinBothRhs$29 = [];
const tmpBinBothRhs$31 = [];
const tmpArrElement$25 = tmpBinBothLhs$25 === tmpBinBothRhs$25;
const tmpArrElement$27 = tmpBinBothLhs$27 !== tmpBinBothRhs$27;
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
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$39 = [];
const tmpBinBothRhs$41 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
];
$(arr);
const arr2 = [x in [], x instanceof []];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = x;
const tmpBinBothRhs = [];
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [];
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [];
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [];
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [];
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [];
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [];
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [];
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [];
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [];
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [];
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [];
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [];
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [];
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [];
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [];
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [];
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [];
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [];
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [];
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
const tmpBinBothRhs$39 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = [];
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = x;
const b = [];
const c = a ** b;
const d = x;
const e = [];
const f = d * e;
const g = x;
const h = [];
const i = g / h;
const j = x;
const k = [];
const l = j % k;
const m = x;
const n = $coerce( m, "plustr" );
const o = x;
const p = [];
const q = o - p;
const r = x;
const s = [];
const t = r << s;
const u = x;
const v = [];
const w = u >> v;
const y = x;
const z = [];
const ba = y >>> z;
const bb = x;
const bc = [];
const bd = bb < bc;
const be = x;
const bf = [];
const bg = be > bf;
const bh = x;
const bi = [];
const bj = bh <= bi;
const bk = x;
const bl = [];
const bm = bk >= bl;
const bn = x;
const bo = x;
const bp = x;
const bq = x;
const br = x;
const bs = [];
const bt = br & bs;
const bu = x;
const bv = [];
const bw = bu ^ bv;
const bx = x;
const by = [];
const bz = bx | by;
const ca = [];
const cb = [];
const cc = [];
const cd = [];
const ce = bn === ca;
const cf = bo !== cb;
const cg = bp === cc;
const ch = bq !== cd;
const ci = [ c, f, i, l, n, q, t, w, ba, bd, bg, bj, bm, ce, cf, cg, ch, bt, bw, bz ];
$( ci );
const cj = x;
const ck = x;
const cl = [];
const cm = [];
const cn = cj in cl;
const co = ck instanceof cm;
const cp = [ cn, co ];
$( cp );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
