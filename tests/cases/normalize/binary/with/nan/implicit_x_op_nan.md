# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Nan > Implicit x op nan
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  x ** NaN,
  x * NaN,
  x / NaN,
  x % NaN,
  x + NaN,
  x - NaN,
  x << NaN,
  x >> NaN,
  x >>> NaN,
  x < NaN,
  x > NaN,
  x <= NaN,
  x >= NaN,
  x == NaN,
  x != NaN,
  x === NaN,
  x !== NaN,
  x & NaN,
  x ^ NaN,
  x | NaN,
];
$(arr);

const arr2 = [
  x in NaN,
  x instanceof NaN,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** NaN,
  x * NaN,
  x / NaN,
  x % NaN,
  x + NaN,
  x - NaN,
  x << NaN,
  x >> NaN,
  x >>> NaN,
  x < NaN,
  x > NaN,
  x <= NaN,
  x >= NaN,
  x == NaN,
  x != NaN,
  x === NaN,
  x !== NaN,
  x & NaN,
  x ^ NaN,
  x | NaN,
];
$(arr);
const arr2 = [x in NaN, x instanceof NaN];
$(arr2);
`````

## Normalized


`````js filename=intro
x * 0;
const tmpArrElement = NaN;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpArrElement$7 = x + NaN;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
x * 0;
const tmpArrElement$17 = false;
x * 0;
const tmpArrElement$19 = false;
x * 0;
const tmpArrElement$21 = false;
x * 0;
const tmpArrElement$23 = false;
x * 0;
const tmpArrElement$25 = false;
x * 0;
const tmpArrElement$27 = true;
x;
const tmpArrElement$29 = false;
x;
const tmpArrElement$31 = true;
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
const tmpArrElement$39 = x in NaN;
const tmpArrElement$41 = x instanceof NaN;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = x + NaN;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const arr = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in NaN;
const tmpArrElement$41 = x instanceof NaN;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = x + NaN;
x ** 0;
const b = x << 0;
const c = x >> 0;
const d = x >>> 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const e = x ^ 0;
const f = x | 0;
const g = [ NaN, NaN, NaN, NaN, a, NaN, b, c, d, false, false, false, false, false, true, false, true, 0, e, f ];
$( g );
const h = x in NaN;
const i = x instanceof NaN;
const j = [ h, i ];
$( j );
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
