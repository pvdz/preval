# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Regex > Implicit x op nan
>
> Deal with certain primitive with binary ops

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

const arr2 = [
  x in /foo/g,
  x instanceof /foo/g,
];
$(arr2);
`````

## Pre Normal


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
const arr2 = [x in /foo/g, x instanceof /foo/g];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = x;
const tmpBinBothRhs = /foo/g;
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = /foo/g;
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = /foo/g;
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = /foo/g;
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = /foo/g;
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = /foo/g;
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = /foo/g;
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = /foo/g;
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = /foo/g;
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = /foo/g;
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = /foo/g;
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = /foo/g;
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = /foo/g;
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = /foo/g;
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = /foo/g;
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = /foo/g;
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = /foo/g;
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
const tmpBinBothRhs$39 = /foo/g;
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = /foo/g;
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
x;
const tmpBinBothRhs /*:regex*/ = /foo/g;
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs;
x;
const tmpBinBothRhs$1 /*:regex*/ = /foo/g;
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$1;
x;
const tmpBinBothRhs$3 /*:regex*/ = /foo/g;
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$3;
x;
const tmpBinBothRhs$5 /*:regex*/ = /foo/g;
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$5;
x;
const tmpBinBothRhs$7 /*:regex*/ = /foo/g;
const tmpArrElement$7 /*:primitive*/ = x + tmpBinBothRhs$7;
x;
const tmpBinBothRhs$9 /*:regex*/ = /foo/g;
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$9;
x;
const tmpBinBothRhs$11 /*:regex*/ = /foo/g;
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$11;
x;
const tmpBinBothRhs$13 /*:regex*/ = /foo/g;
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$13;
x;
const tmpBinBothRhs$15 /*:regex*/ = /foo/g;
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$15;
x;
const tmpBinBothRhs$17 /*:regex*/ = /foo/g;
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$17;
x;
const tmpBinBothRhs$19 /*:regex*/ = /foo/g;
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$19;
x;
const tmpBinBothRhs$21 /*:regex*/ = /foo/g;
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$21;
x;
const tmpBinBothRhs$23 /*:regex*/ = /foo/g;
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$23;
x;
const tmpBinBothRhs$33 /*:regex*/ = /foo/g;
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$33;
x;
const tmpBinBothRhs$35 /*:regex*/ = /foo/g;
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$35;
x;
const tmpBinBothRhs$37 /*:regex*/ = /foo/g;
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$37;
const tmpBinBothRhs$25 /*:regex*/ = /foo/g;
const tmpBinBothRhs$27 /*:regex*/ = /foo/g;
const tmpBinBothRhs$29 /*:regex*/ = /foo/g;
const tmpBinBothRhs$31 /*:regex*/ = /foo/g;
const tmpArrElement$25 /*:boolean*/ = x === tmpBinBothRhs$25;
const tmpArrElement$27 /*:boolean*/ = x !== tmpBinBothRhs$27;
const tmpArrElement$29 /*:boolean*/ = x === tmpBinBothRhs$29;
const tmpArrElement$31 /*:boolean*/ = x !== tmpBinBothRhs$31;
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
x;
const tmpBinBothRhs$39 /*:regex*/ = /foo/g;
const tmpBinBothRhs$41 /*:regex*/ = /foo/g;
const tmpArrElement$39 /*:boolean*/ = x in tmpBinBothRhs$39;
const tmpArrElement$41 /*:boolean*/ = x instanceof tmpBinBothRhs$41;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
x;
const a = /foo/g;
const b = x ** a;
x;
const c = /foo/g;
const d = x * c;
x;
const e = /foo/g;
const f = x / e;
x;
const g = /foo/g;
const h = x % g;
x;
const i = /foo/g;
const j = x + i;
x;
const k = /foo/g;
const l = x - k;
x;
const m = /foo/g;
const n = x << m;
x;
const o = /foo/g;
const p = x >> o;
x;
const q = /foo/g;
const r = x >>> q;
x;
const s = /foo/g;
const t = x < s;
x;
const u = /foo/g;
const v = x > u;
x;
const w = /foo/g;
const x = x <= w;
x;
const y = /foo/g;
const z = x >= y;
x;
const ba = /foo/g;
const bb = x & ba;
x;
const bc = /foo/g;
const bd = x ^ bc;
x;
const be = /foo/g;
const bf = x | be;
const bg = /foo/g;
const bh = /foo/g;
const bi = /foo/g;
const bj = /foo/g;
const bk = x === bg;
const bl = x !== bh;
const bm = x === bi;
const bn = x !== bj;
const bo = [ b, d, f, h, j, l, n, p, r, t, v, x, z, bk, bl, bm, bn, bb, bd, bf ];
$( bo );
x;
const bp = /foo/g;
const bq = /foo/g;
const br = x in bp;
const bs = x instanceof bq;
const bt = [ br, bs ];
$( bt );
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
