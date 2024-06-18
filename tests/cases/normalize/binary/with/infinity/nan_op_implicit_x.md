# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Infinity > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);

const arr2 = [
  Infinity in x,
  Infinity instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);
const arr2 = [Infinity in x, Infinity instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$29 = Infinity === x;
const tmpArrElement$31 = Infinity !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
const tmpArrElement$39 = Infinity in x;
const tmpArrElement$41 = Infinity instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$29 = Infinity === x;
const tmpArrElement$31 = Infinity !== x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = Infinity in x;
const tmpArrElement$41 = Infinity instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Infinity ** x;
const b = Infinity * x;
const c = Infinity / x;
const d = Infinity % x;
const e = Infinity + x;
const f = Infinity - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = Infinity < x;
const k = Infinity > x;
const l = Infinity <= x;
const m = Infinity >= x;
const n = Infinity == x;
const o = Infinity != x;
const p = Infinity === x;
const q = Infinity !== x;
x ** 0;
const r = 0 ^ x;
const s = 0 | x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = Infinity in x;
const v = Infinity instanceof x;
const w = [ u, v ];
$( w );
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
