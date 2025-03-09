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
const tmpBinLhs /*:array*/ = [10, 20, 30];
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:array*/ = [10, 20, 30];
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:array*/ = [10, 20, 30];
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:array*/ = [10, 20, 30];
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
const tmpBinLhs$9 /*:array*/ = [10, 20, 30];
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:array*/ = [10, 20, 30];
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:array*/ = [10, 20, 30];
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:array*/ = [10, 20, 30];
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:array*/ = [10, 20, 30];
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:array*/ = [10, 20, 30];
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:array*/ = [10, 20, 30];
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:array*/ = [10, 20, 30];
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:array*/ = [10, 20, 30];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 === x;
const tmpBinLhs$27 /*:array*/ = [10, 20, 30];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 !== x;
const tmpBinLhs$29 /*:array*/ = [10, 20, 30];
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpBinLhs$31 /*:array*/ = [10, 20, 30];
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpBinLhs$33 /*:array*/ = [10, 20, 30];
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:array*/ = [10, 20, 30];
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:array*/ = [10, 20, 30];
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpArrElement$7 /*:string*/ = `10,20,30${tmpStringConcatL}`;
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
const tmpArrElement = [10, 20, 30] ** x;
const tmpArrElement$1 = [10, 20, 30] * x;
const tmpArrElement$3 = [10, 20, 30] / x;
const tmpArrElement$5 = [10, 20, 30] % x;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$9 = [10, 20, 30] - x;
const tmpArrElement$11 = [10, 20, 30] << x;
const tmpArrElement$13 = [10, 20, 30] >> x;
const tmpArrElement$15 = [10, 20, 30] >>> x;
const tmpArrElement$17 = [10, 20, 30] < x;
const tmpArrElement$19 = [10, 20, 30] > x;
const tmpArrElement$21 = [10, 20, 30] <= x;
const tmpArrElement$23 = [10, 20, 30] >= x;
const tmpArrElement$25 = [10, 20, 30] === x;
const tmpArrElement$27 = [10, 20, 30] !== x;
const tmpArrElement$29 = [10, 20, 30] === x;
const tmpArrElement$31 = [10, 20, 30] !== x;
const tmpArrElement$33 = [10, 20, 30] & x;
const tmpArrElement$35 = [10, 20, 30] ^ x;
const tmpArrElement$37 = [10, 20, 30] | x;
const tmpArrElement$7 = `10,20,30${tmpStringConcatL}`;
$([
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
const a = [ 10, 20, 30 ];
const b = a ** x;
const c = [ 10, 20, 30 ];
const d = c * x;
const e = [ 10, 20, 30 ];
const f = e / x;
const g = [ 10, 20, 30 ];
const h = g % x;
const i = $coerce( x, "plustr" );
const j = [ 10, 20, 30 ];
const k = j - x;
const l = [ 10, 20, 30 ];
const m = l << x;
const n = [ 10, 20, 30 ];
const o = n >> x;
const p = [ 10, 20, 30 ];
const q = p >>> x;
const r = [ 10, 20, 30 ];
const s = r < x;
const t = [ 10, 20, 30 ];
const u = t > x;
const v = [ 10, 20, 30 ];
const w = v <= x;
const y = [ 10, 20, 30 ];
const z = y >= x;
const ba = [ 10, 20, 30 ];
const bb = ba === x;
const bc = [ 10, 20, 30 ];
const bd = bc !== x;
const be = [ 10, 20, 30 ];
const bf = be === x;
const bg = [ 10, 20, 30 ];
const bh = bg !== x;
const bi = [ 10, 20, 30 ];
const bj = bi & x;
const bk = [ 10, 20, 30 ];
const bl = bk ^ x;
const bm = [ 10, 20, 30 ];
const bn = bm | x;
const bo = `10,20,30${i}`;
const bp = [ b, d, f, h, bo, k, m, o, q, s, u, w, z, bb, bd, bf, bh, bj, bl, bn ];
$( bp );
const bq = [ 10, 20, 30 ];
const br = bq in x;
const bs = [ 10, 20, 30 ];
const bt = bs instanceof x;
const bu = [ br, bt ];
$( bu );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
