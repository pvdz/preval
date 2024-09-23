# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Neg infinity > Nan op implicit x
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  (-Infinity) ** x, // Syntax error without parens ;)
  -Infinity * x,
  -Infinity / x,
  -Infinity % x,
  -Infinity + x,
  -Infinity - x,
  -Infinity << x,
  -Infinity >> x,
  -Infinity >>> x,
  -Infinity < x,
  -Infinity > x,
  -Infinity <= x,
  -Infinity >= x,
  -Infinity == x,
  -Infinity != x,
  -Infinity === x,
  -Infinity !== x,
  -Infinity & x,
  -Infinity ^ x,
  -Infinity | x,
];
$(arr);

const arr2 = [
  -Infinity in x,
  -Infinity instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  (-Infinity) ** x,
  -Infinity * x,
  -Infinity / x,
  -Infinity % x,
  -Infinity + x,
  -Infinity - x,
  -Infinity << x,
  -Infinity >> x,
  -Infinity >>> x,
  -Infinity < x,
  -Infinity > x,
  -Infinity <= x,
  -Infinity >= x,
  -Infinity == x,
  -Infinity != x,
  -Infinity === x,
  -Infinity !== x,
  -Infinity & x,
  -Infinity ^ x,
  -Infinity | x,
];
$(arr);
const arr2 = [-Infinity in x, -Infinity instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = (-Infinity) ** x;
const tmpArrElement$1 = -Infinity * x;
const tmpArrElement$3 = -Infinity / x;
const tmpArrElement$5 = -Infinity % x;
const tmpArrElement$7 = -Infinity + x;
const tmpArrElement$9 = -Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = -Infinity < x;
const tmpArrElement$19 = -Infinity > x;
const tmpArrElement$21 = -Infinity <= x;
const tmpArrElement$23 = -Infinity >= x;
const tmpArrElement$25 = -Infinity == x;
const tmpArrElement$27 = -Infinity != x;
const tmpArrElement$29 = -Infinity === x;
const tmpArrElement$31 = -Infinity !== x;
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
const tmpArrElement$39 = -Infinity in x;
const tmpArrElement$41 = -Infinity instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement /*:number*/ = (-Infinity) ** x;
const tmpArrElement$1 /*:number*/ = -Infinity * x;
const tmpArrElement$3 /*:number*/ = -Infinity / x;
const tmpArrElement$5 /*:number*/ = -Infinity % x;
const tmpArrElement$7 /*:primitive*/ = -Infinity + x;
const tmpArrElement$9 /*:number*/ = -Infinity - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = -Infinity < x;
const tmpArrElement$19 /*:boolean*/ = -Infinity > x;
const tmpArrElement$21 /*:boolean*/ = -Infinity <= x;
const tmpArrElement$23 /*:boolean*/ = -Infinity >= x;
const tmpArrElement$25 /*:boolean*/ = -Infinity == x;
const tmpArrElement$27 /*:boolean*/ = -Infinity != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$29 /*:boolean*/ = -Infinity === x;
const tmpArrElement$31 /*:boolean*/ = -Infinity !== x;
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 /*:boolean*/ = -Infinity in x;
const tmpArrElement$41 /*:boolean*/ = -Infinity instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = -Infinity ** x;
const b = -Infinity * x;
const c = -Infinity / x;
const d = -Infinity % x;
const e = -Infinity + x;
const f = -Infinity - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = -Infinity < x;
const k = -Infinity > x;
const l = -Infinity <= x;
const m = -Infinity >= x;
const n = -Infinity == x;
const o = -Infinity != x;
x ** 0;
const p = 0 ^ x;
const q = 0 | x;
const r = -Infinity === x;
const s = -Infinity !== x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, r, s, 0, p, q ];
$( t );
const u = -Infinity in x;
const v = -Infinity instanceof x;
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
