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
const tmpBinLhs /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpStringConcatL /*:string*/ = $coerce(x, `plustr`);
const tmpBinLhs$9 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 === x;
const tmpBinLhs$27 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 !== x;
const tmpBinLhs$29 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpBinLhs$31 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpBinLhs$33 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpArrElement$7 /*:string*/ = `a,b,c${tmpStringConcatL}`;
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
const tmpArrElement = [`a`, `b`, `c`] ** x;
const tmpArrElement$1 = [`a`, `b`, `c`] * x;
const tmpArrElement$3 = [`a`, `b`, `c`] / x;
const tmpArrElement$5 = [`a`, `b`, `c`] % x;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$9 = [`a`, `b`, `c`] - x;
const tmpArrElement$11 = [`a`, `b`, `c`] << x;
const tmpArrElement$13 = [`a`, `b`, `c`] >> x;
const tmpArrElement$15 = [`a`, `b`, `c`] >>> x;
const tmpArrElement$17 = [`a`, `b`, `c`] < x;
const tmpArrElement$19 = [`a`, `b`, `c`] > x;
const tmpArrElement$21 = [`a`, `b`, `c`] <= x;
const tmpArrElement$23 = [`a`, `b`, `c`] >= x;
const tmpArrElement$25 = [`a`, `b`, `c`] === x;
const tmpArrElement$27 = [`a`, `b`, `c`] !== x;
const tmpArrElement$29 = [`a`, `b`, `c`] === x;
const tmpArrElement$31 = [`a`, `b`, `c`] !== x;
const tmpArrElement$33 = [`a`, `b`, `c`] & x;
const tmpArrElement$35 = [`a`, `b`, `c`] ^ x;
const tmpArrElement$37 = [`a`, `b`, `c`] | x;
const tmpArrElement$7 = `a,b,c${tmpStringConcatL}`;
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
const a = [ "a", "b", "c" ];
const b = a ** x;
const c = [ "a", "b", "c" ];
const d = c * x;
const e = [ "a", "b", "c" ];
const f = e / x;
const g = [ "a", "b", "c" ];
const h = g % x;
const i = $coerce( x, "plustr" );
const j = [ "a", "b", "c" ];
const k = j - x;
const l = [ "a", "b", "c" ];
const m = l << x;
const n = [ "a", "b", "c" ];
const o = n >> x;
const p = [ "a", "b", "c" ];
const q = p >>> x;
const r = [ "a", "b", "c" ];
const s = r < x;
const t = [ "a", "b", "c" ];
const u = t > x;
const v = [ "a", "b", "c" ];
const w = v <= x;
const y = [ "a", "b", "c" ];
const z = y >= x;
const ba = [ "a", "b", "c" ];
const bb = ba === x;
const bc = [ "a", "b", "c" ];
const bd = bc !== x;
const be = [ "a", "b", "c" ];
const bf = be === x;
const bg = [ "a", "b", "c" ];
const bh = bg !== x;
const bi = [ "a", "b", "c" ];
const bj = bi & x;
const bk = [ "a", "b", "c" ];
const bl = bk ^ x;
const bm = [ "a", "b", "c" ];
const bn = bm | x;
const bo = `a,b,c${i}`;
const bp = [ b, d, f, h, bo, k, m, o, q, s, u, w, z, bb, bd, bf, bh, bj, bl, bn ];
$( bp );
const bq = [ "a", "b", "c" ];
const br = bq in x;
const bs = [ "a", "b", "c" ];
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
