# Preval test case

# arr_strings_op_implicit_x.md

> Normalize > Binary > With > Arr > Arr strings op implicit x
>
> Deal with certain primitive with binary ops

In this variant we tell preval that array is an empty array
so it will probably end up resolving most of these trivial
cases.
There's also a test where we give preval an array without telling
it the contents (through Array.from).
Also a variation where the array contents is some strings or numbers.

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  ['a', 'b', 'c'] ** x,
  ['a', 'b', 'c'] * x,
  ['a', 'b', 'c'] / x,
  ['a', 'b', 'c'] % x,
  ['a', 'b', 'c'] + x,
  ['a', 'b', 'c'] - x,
  ['a', 'b', 'c'] << x,
  ['a', 'b', 'c'] >> x,
  ['a', 'b', 'c'] >>> x,
  ['a', 'b', 'c'] < x,
  ['a', 'b', 'c'] > x,
  ['a', 'b', 'c'] <= x,
  ['a', 'b', 'c'] >= x,
  ['a', 'b', 'c'] == x,
  ['a', 'b', 'c'] != x,
  ['a', 'b', 'c'] === x,
  ['a', 'b', 'c'] !== x,
  ['a', 'b', 'c'] & x,
  ['a', 'b', 'c'] ^ x,
  ['a', 'b', 'c'] | x,
];
$(arr);

const arr2 = [
  ['a', 'b', 'c'] in x,
  ['a', 'b', 'c'] instanceof x,
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
const tmpArrElement$17 /*:boolean*/ = `a,b,c` < x;
const tmpArrElement$19 /*:boolean*/ = `a,b,c` > x;
const tmpArrElement$21 /*:boolean*/ = `a,b,c` <= x;
const tmpArrElement$23 /*:boolean*/ = `a,b,c` >= x;
const tmpBinLhs$25 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$7 /*:string*/ = `a,b,c${tmpStringConcatL}`;
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
const tmpBinLhs$39 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpBinLhs$41 /*:array*/ = [`a`, `b`, `c`];
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
const tmpArrElement$17 = `a,b,c` < x;
const tmpArrElement$19 = `a,b,c` > x;
const tmpArrElement$21 = `a,b,c` <= x;
const tmpArrElement$23 = `a,b,c` >= x;
const tmpArrElement$25 = [`a`, `b`, `c`] == x;
const tmpArrElement$27 = [`a`, `b`, `c`] != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$7 = `a,b,c${tmpStringConcatL}`;
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
const tmpArrElement$39 = [`a`, `b`, `c`] in x;
const tmpArrElement$41 = [`a`, `b`, `c`] instanceof x;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const arr = [
  [`a`, `b`, `c`] ** x,
  [`a`, `b`, `c`] * x,
  [`a`, `b`, `c`] / x,
  [`a`, `b`, `c`] % x,
  [`a`, `b`, `c`] + x,
  [`a`, `b`, `c`] - x,
  [`a`, `b`, `c`] << x,
  [`a`, `b`, `c`] >> x,
  [`a`, `b`, `c`] >>> x,
  [`a`, `b`, `c`] < x,
  [`a`, `b`, `c`] > x,
  [`a`, `b`, `c`] <= x,
  [`a`, `b`, `c`] >= x,
  [`a`, `b`, `c`] == x,
  [`a`, `b`, `c`] != x,
  [`a`, `b`, `c`] === x,
  [`a`, `b`, `c`] !== x,
  [`a`, `b`, `c`] & x,
  [`a`, `b`, `c`] ^ x,
  [`a`, `b`, `c`] | x,
];
$(arr);
const arr2 = [[`a`, `b`, `c`] in x, [`a`, `b`, `c`] instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = [`a`, `b`, `c`];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [`a`, `b`, `c`];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [`a`, `b`, `c`];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [`a`, `b`, `c`];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = [`a`, `b`, `c`];
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = [`a`, `b`, `c`];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [`a`, `b`, `c`];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [`a`, `b`, `c`];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [`a`, `b`, `c`];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [`a`, `b`, `c`];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [`a`, `b`, `c`];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [`a`, `b`, `c`];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [`a`, `b`, `c`];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [`a`, `b`, `c`];
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = [`a`, `b`, `c`];
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = [`a`, `b`, `c`];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [`a`, `b`, `c`];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [`a`, `b`, `c`];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [`a`, `b`, `c`];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [`a`, `b`, `c`];
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
const tmpBinLhs$39 = [`a`, `b`, `c`];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [`a`, `b`, `c`];
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
const e = "a,b,c" < x;
const f = "a,b,c" > x;
const g = "a,b,c" <= x;
const h = "a,b,c" >= x;
const i = [ "a", "b", "c" ];
const j = i == x;
const k = [ "a", "b", "c" ];
const l = k != x;
x ** 0;
const m = 0 ^ x;
const n = 0 | x;
const o = `a,b,c${a}`;
const p = [ NaN, NaN, NaN, NaN, o, NaN, b, c, d, e, f, g, h, j, l, false, true, 0, m, n ];
$( p );
const q = [ "a", "b", "c" ];
const r = q in x;
const s = [ "a", "b", "c" ];
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
