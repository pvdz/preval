# Preval test case

# arr_numbers_op_implicit_x.md

> Normalize > Binary > With > Arr > Arr numbers op implicit x
>
> Deal with certain primitive with binary ops

In this variant we tell preval that array is an array with strings
so it will probably end up resolving most of these trivial
cases.
There's also a test where we give preval an array without telling
it the contents (through Array.from).
Also a variation where the array contents is empty or some numbers.

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  [10, 20, 30] ** x,
  [10, 20, 30] * x,
  [10, 20, 30] / x,
  [10, 20, 30] % x,
  [10, 20, 30] + x,
  [10, 20, 30] - x,
  [10, 20, 30] << x,
  [10, 20, 30] >> x,
  [10, 20, 30] >>> x,
  [10, 20, 30] < x,
  [10, 20, 30] > x,
  [10, 20, 30] <= x,
  [10, 20, 30] >= x,
  [10, 20, 30] == x,
  [10, 20, 30] != x,
  [10, 20, 30] === x,
  [10, 20, 30] !== x,
  [10, 20, 30] & x,
  [10, 20, 30] ^ x,
  [10, 20, 30] | x,
];
$(arr);

const arr2 = [
  [10, 20, 30] in x,
  [10, 20, 30] instanceof x,
];
$(arr2);
`````

## Settled


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = `10,20,30` < x;
const tmpArrElement$19 /*:boolean*/ = `10,20,30` > x;
const tmpArrElement$21 /*:boolean*/ = `10,20,30` <= x;
const tmpArrElement$23 /*:boolean*/ = `10,20,30` >= x;
const tmpBinLhs$25 /*:array*/ = [10, 20, 30];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:array*/ = [10, 20, 30];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$7 /*:string*/ = `10,20,30${tmpStringConcatL}`;
const arr /*:array*/ = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinLhs$39 /*:array*/ = [10, 20, 30];
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpBinLhs$41 /*:array*/ = [10, 20, 30];
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL = $coerce(x, `plustr`);
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `10,20,30` < x;
const tmpArrElement$19 = `10,20,30` > x;
const tmpArrElement$21 = `10,20,30` <= x;
const tmpArrElement$23 = `10,20,30` >= x;
const tmpArrElement$25 = [10, 20, 30] == x;
const tmpArrElement$27 = [10, 20, 30] != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$7 = `10,20,30${tmpStringConcatL}`;
$([
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpArrElement$39 = [10, 20, 30] in x;
const tmpArrElement$41 = [10, 20, 30] instanceof x;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const arr = [
  [10, 20, 30] ** x,
  [10, 20, 30] * x,
  [10, 20, 30] / x,
  [10, 20, 30] % x,
  [10, 20, 30] + x,
  [10, 20, 30] - x,
  [10, 20, 30] << x,
  [10, 20, 30] >> x,
  [10, 20, 30] >>> x,
  [10, 20, 30] < x,
  [10, 20, 30] > x,
  [10, 20, 30] <= x,
  [10, 20, 30] >= x,
  [10, 20, 30] == x,
  [10, 20, 30] != x,
  [10, 20, 30] === x,
  [10, 20, 30] !== x,
  [10, 20, 30] & x,
  [10, 20, 30] ^ x,
  [10, 20, 30] | x,
];
$(arr);
const arr2 = [[10, 20, 30] in x, [10, 20, 30] instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = [10, 20, 30];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [10, 20, 30];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [10, 20, 30];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [10, 20, 30];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = [10, 20, 30];
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = [10, 20, 30];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [10, 20, 30];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [10, 20, 30];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [10, 20, 30];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [10, 20, 30];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [10, 20, 30];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [10, 20, 30];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [10, 20, 30];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [10, 20, 30];
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = [10, 20, 30];
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = [10, 20, 30];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [10, 20, 30];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [10, 20, 30];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [10, 20, 30];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [10, 20, 30];
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
const tmpBinLhs$39 = [10, 20, 30];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [10, 20, 30];
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Settled
With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = $coerce( x, "plustr" );
x ** 0;
const b = 0 << x;
const c = 0 >> x;
const d = 0 >>> x;
const e = "10,20,30" < x;
const f = "10,20,30" > x;
const g = "10,20,30" <= x;
const h = "10,20,30" >= x;
const i = [ 10, 20, 30 ];
const j = i == x;
const k = [ 10, 20, 30 ];
const l = k != x;
x ** 0;
const m = 0 ^ x;
const n = 0 | x;
const o = `10,20,30${a}`;
const p = [ NaN, NaN, NaN, NaN, o, NaN, b, c, d, e, f, g, h, j, l, false, true, 0, m, n ];
$( p );
const q = [ 10, 20, 30 ];
const r = q in x;
const s = [ 10, 20, 30 ];
const t = s instanceof x;
const u = [ r, t ];
$( u );
`````

## Globals

None (except for the 1 globals expected by the test)

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
