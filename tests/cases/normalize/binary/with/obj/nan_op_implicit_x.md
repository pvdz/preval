# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Obj > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
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

const arr2 = [
  {} in x,
  {} instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
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
const arr2 = [{} in x, {} instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
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
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = {};
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
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
const tmpBinLhs$33 /*:object*/ = {};
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:object*/ = {};
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:object*/ = {};
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpBinLhs$25 /*:object*/ = {};
const tmpBinLhs$27 /*:object*/ = {};
const tmpBinLhs$29 /*:object*/ = {};
const tmpBinLhs$31 /*:object*/ = {};
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 === x;
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 !== x;
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
const tmpBinLhs$41 /*:object*/ = {};
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = a ** x;
const c = {};
const d = c * x;
const e = {};
const f = e / x;
const g = {};
const h = g % x;
const i = {};
const j = i + x;
const k = {};
const l = k - x;
const m = {};
const n = m << x;
const o = {};
const p = o >> x;
const q = {};
const r = q >>> x;
const s = {};
const t = s < x;
const u = {};
const v = u > x;
const w = {};
const y = w <= x;
const z = {};
const ba = z >= x;
const bb = {};
const bc = bb & x;
const bd = {};
const be = bd ^ x;
const bf = {};
const bg = bf | x;
const bh = {};
const bi = {};
const bj = {};
const bk = {};
const bl = bh === x;
const bm = bi !== x;
const bn = bj === x;
const bo = bk !== x;
const bp = [ b, d, f, h, j, l, n, p, r, t, v, y, ba, bl, bm, bn, bo, bc, be, bg ];
$( bp );
const bq = {};
const br = {};
const bs = bq in x;
const bt = br instanceof x;
const bu = [ bs, bt ];
$( bu );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
