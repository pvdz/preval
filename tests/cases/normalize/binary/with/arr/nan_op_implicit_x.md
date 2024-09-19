# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Arr > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);

const arr2 = [
  [] in x,
  [] instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);
const arr2 = [[] in x, [] instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = [];
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = [];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [];
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = [];
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = [];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [];
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
const tmpBinLhs$39 = [];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [];
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpBinLhs$9 = [];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$33 = [];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [];
const tmpArrElement$37 = tmpBinLhs$37 | x;
const tmpBinLhs$25 = [];
const tmpBinLhs$27 = [];
const tmpBinLhs$29 = [];
const tmpBinLhs$31 = [];
const tmpArrElement$25 = tmpBinLhs$25 === x;
const tmpArrElement$27 = tmpBinLhs$27 !== x;
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpArrElement$31 = tmpBinLhs$31 !== x;
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
const tmpBinLhs$39 = [];
const tmpBinLhs$41 = [];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = a ** x;
const c = [];
const d = c * x;
const e = [];
const f = e / x;
const g = [];
const h = g % x;
const i = $coerce( x, "plustr" );
const j = [];
const k = j - x;
const l = [];
const m = l << x;
const n = [];
const o = n >> x;
const p = [];
const q = p >>> x;
const r = [];
const s = r < x;
const t = [];
const u = t > x;
const v = [];
const w = v <= x;
const x = [];
const y = x >= x;
const z = [];
const ba = z & x;
const bb = [];
const bc = bb ^ x;
const bd = [];
const be = bd | x;
const bf = [];
const bg = [];
const bh = [];
const bi = [];
const bj = bf === x;
const bk = bg !== x;
const bl = bh === x;
const bm = bi !== x;
const bn = [ b, d, f, h, i, k, m, o, q, s, u, w, y, bj, bk, bl, bm, ba, bc, be ];
$( bn );
const bo = [];
const bp = [];
const bq = bo in x;
const br = bp instanceof x;
const bs = [ bq, br ];
$( bs );
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
