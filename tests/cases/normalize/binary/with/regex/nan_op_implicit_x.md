# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Regex > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);

const arr2 = [
  /foo/g in x,
  /foo/g instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  /foo/g ** x,
  /foo/g * x,
  /foo/g / x,
  /foo/g % x,
  /foo/g + x,
  /foo/g - x,
  /foo/g << x,
  /foo/g >> x,
  /foo/g >>> x,
  /foo/g < x,
  /foo/g > x,
  /foo/g <= x,
  /foo/g >= x,
  /foo/g == x,
  /foo/g != x,
  /foo/g === x,
  /foo/g !== x,
  /foo/g & x,
  /foo/g ^ x,
  /foo/g | x,
];
$(arr);
const arr2 = [/foo/g in x, /foo/g instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = /foo/g;
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = /foo/g;
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = /foo/g;
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = /foo/g;
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = /foo/g;
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = /foo/g;
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = /foo/g;
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = /foo/g;
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = /foo/g;
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = /foo/g;
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = /foo/g;
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = /foo/g;
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = /foo/g;
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = /foo/g;
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = /foo/g;
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = /foo/g;
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = /foo/g;
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
const tmpBinLhs$39 = /foo/g;
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = /foo/g;
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpBinLhs /*:regex*/ = /foo/g;
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:regex*/ = /foo/g;
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:regex*/ = /foo/g;
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:regex*/ = /foo/g;
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
const tmpBinLhs$9 /*:regex*/ = /foo/g;
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:regex*/ = /foo/g;
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:regex*/ = /foo/g;
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:regex*/ = /foo/g;
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:regex*/ = /foo/g;
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:regex*/ = /foo/g;
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:regex*/ = /foo/g;
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:regex*/ = /foo/g;
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$33 /*:regex*/ = /foo/g;
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:regex*/ = /foo/g;
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:regex*/ = /foo/g;
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpBinLhs$25 /*:regex*/ = /foo/g;
const tmpBinLhs$27 /*:regex*/ = /foo/g;
const tmpBinLhs$29 /*:regex*/ = /foo/g;
const tmpBinLhs$31 /*:regex*/ = /foo/g;
const tmpArrElement$7 /*:string*/ = `/foo/g${tmpStringConcatL}`;
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
const tmpBinLhs$39 /*:regex*/ = /foo/g;
const tmpBinLhs$41 /*:regex*/ = /foo/g;
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/g;
const b = a ** x;
const c = /foo/g;
const d = c * x;
const e = /foo/g;
const f = e / x;
const g = /foo/g;
const h = g % x;
const i = $coerce( x, "plustr" );
const j = /foo/g;
const k = j - x;
const l = /foo/g;
const m = l << x;
const n = /foo/g;
const o = n >> x;
const p = /foo/g;
const q = p >>> x;
const r = /foo/g;
const s = r < x;
const t = /foo/g;
const u = t > x;
const v = /foo/g;
const w = v <= x;
const y = /foo/g;
const z = y >= x;
const ba = /foo/g;
const bb = ba & x;
const bc = /foo/g;
const bd = bc ^ x;
const be = /foo/g;
const bf = be | x;
const bg = /foo/g;
const bh = /foo/g;
const bi = /foo/g;
const bj = /foo/g;
const bk = `/foo/g${i}`;
const bl = bg === x;
const bm = bh !== x;
const bn = bi === x;
const bo = bj !== x;
const bp = [ b, d, f, h, bk, k, m, o, q, s, u, w, z, bl, bm, bn, bo, bb, bd, bf ];
$( bp );
const bq = /foo/g;
const br = /foo/g;
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
