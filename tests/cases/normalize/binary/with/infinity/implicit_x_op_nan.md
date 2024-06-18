# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Infinity > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  x ** Infinity,
  x * Infinity,
  x / Infinity,
  x % Infinity,
  x + Infinity,
  x - Infinity,
  x << Infinity,
  x >> Infinity,
  x >>> Infinity,
  x < Infinity,
  x > Infinity,
  x <= Infinity,
  x >= Infinity,
  x == Infinity,
  x != Infinity,
  x === Infinity,
  x !== Infinity,
  x & Infinity,
  x ^ Infinity,
  x | Infinity,
];
$(arr);

const arr2 = [
  x in Infinity,
  x instanceof Infinity,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** Infinity,
  x * Infinity,
  x / Infinity,
  x % Infinity,
  x + Infinity,
  x - Infinity,
  x << Infinity,
  x >> Infinity,
  x >>> Infinity,
  x < Infinity,
  x > Infinity,
  x <= Infinity,
  x >= Infinity,
  x == Infinity,
  x != Infinity,
  x === Infinity,
  x !== Infinity,
  x & Infinity,
  x ^ Infinity,
  x | Infinity,
];
$(arr);
const arr2 = [x in Infinity, x instanceof Infinity];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = x ** Infinity;
const tmpArrElement$1 = x * Infinity;
const tmpArrElement$3 = x / Infinity;
const tmpArrElement$5 = x % Infinity;
const tmpArrElement$7 = x + Infinity;
const tmpArrElement$9 = x - Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < Infinity;
const tmpArrElement$19 = x > Infinity;
const tmpArrElement$21 = x <= Infinity;
const tmpArrElement$23 = x >= Infinity;
const tmpArrElement$25 = x == Infinity;
const tmpArrElement$27 = x != Infinity;
const tmpArrElement$29 = x === Infinity;
const tmpArrElement$31 = x !== Infinity;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in Infinity;
const tmpArrElement$41 = x instanceof Infinity;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement = x ** Infinity;
const tmpArrElement$1 = x * Infinity;
const tmpArrElement$3 = x / Infinity;
const tmpArrElement$5 = x % Infinity;
const tmpArrElement$7 = x + Infinity;
const tmpArrElement$9 = x - Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < Infinity;
const tmpArrElement$19 = x > Infinity;
const tmpArrElement$21 = x <= Infinity;
const tmpArrElement$23 = x >= Infinity;
const tmpArrElement$25 = x == Infinity;
const tmpArrElement$27 = x != Infinity;
const tmpArrElement$29 = x === Infinity;
const tmpArrElement$31 = x !== Infinity;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in Infinity;
const tmpArrElement$41 = x instanceof Infinity;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = x ** Infinity;
const b = x * Infinity;
const c = x / Infinity;
const d = x % Infinity;
const e = x + Infinity;
const f = x - Infinity;
const g = x << 0;
const h = x >> 0;
const i = x >>> 0;
const j = x < Infinity;
const k = x > Infinity;
const l = x <= Infinity;
const m = x >= Infinity;
const n = x == Infinity;
const o = x != Infinity;
const p = x === Infinity;
const q = x !== Infinity;
x ** 0;
const r = x ^ 0;
const s = x | 0;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = x in Infinity;
const v = x instanceof Infinity;
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
