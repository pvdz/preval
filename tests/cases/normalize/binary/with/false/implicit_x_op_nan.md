# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > False > Implicit x op nan
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);

const arr2 = [
  x in false,
  x instanceof false,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);
const arr2 = [x in false, x instanceof false];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
const tmpArrElement$29 = x === false;
const tmpArrElement$31 = x !== false;
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
const tmpArrElement$39 = x in false;
const tmpArrElement$41 = x instanceof false;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
const tmpArrElement$29 = x === false;
const tmpArrElement$31 = x !== false;
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
const tmpArrElement$39 = x in false;
const tmpArrElement$41 = x instanceof false;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = x ** 0;
const b = x * 0;
const c = x / 0;
const d = x % 0;
const e = x + false;
const f = x - 0;
const g = x << 0;
const h = x >> 0;
const i = x >>> 0;
const j = x < false;
const k = x > false;
const l = x <= false;
const m = x >= false;
const n = x == false;
const o = x != false;
const p = x === false;
const q = x !== false;
x ** 0;
const r = x ^ 0;
const s = x | 0;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = x in false;
const v = x instanceof false;
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
