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
const tmpBinLhs = /foo/g;
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = /foo/g;
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = /foo/g;
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = /foo/g;
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$7 = `/foo/g${tmpStringConcatL}`;
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
const tmpArrElement$25 = tmpBinLhs$25 === x;
const tmpBinLhs$27 = /foo/g;
const tmpArrElement$27 = tmpBinLhs$27 !== x;
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
const j = `/foo/g${tmpStringConcatL}`;
const k = /foo/g;
const l = k - x;
const m = /foo/g;
const n = m << x;
const o = /foo/g;
const p = o >> x;
const q = /foo/g;
const r = q >>> x;
const s = /foo/g;
const t = s < x;
const u = /foo/g;
const v = u > x;
const w = /foo/g;
const x = w <= x;
const y = /foo/g;
const z = y >= x;
const 01 = /foo/g;
const 11 = 01 === x;
const 21 = /foo/g;
const 31 = 21 !== x;
const 41 = /foo/g;
const 51 = 41 === x;
const 61 = /foo/g;
const 71 = 61 !== x;
const 81 = /foo/g;
const 91 = 81 & x;
const a1 = /foo/g;
const b1 = a1 ^ x;
const c1 = /foo/g;
const d1 = c1 | x;
const e1 = [ b, d, f, h, j, l, n, p, r, t, v, x, z, 11, 31, 51, 71, 91, b1, d1 ];
$( e1 );
const f1 = /foo/g;
const g1 = f1 in x;
const h1 = /foo/g;
const i1 = h1 instanceof x;
const j1 = [ g1, i1 ];
$( j1 );
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
