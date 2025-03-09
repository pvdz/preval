# Preval test case

# arr_op_implicit_arr_empty.md

> Normalize > Binary > With > Arr > Arr op implicit arr empty
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
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);

const arr2 = [
  [] in x,
  [] instanceof x,
];
$(arr2);
`````

## Settled


`````js filename=intro
const tmpBinLhs /*:array*/ = [];
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:array*/ = [];
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:array*/ = [];
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:array*/ = [];
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpArrElement$7 /*:string*/ = $coerce(x, `plustr`);
const tmpBinLhs$9 /*:array*/ = [];
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:array*/ = [];
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:array*/ = [];
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:array*/ = [];
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:array*/ = [];
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:array*/ = [];
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:array*/ = [];
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:array*/ = [];
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:array*/ = [];
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpBinLhs$29 /*:array*/ = [];
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpBinLhs$31 /*:array*/ = [];
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
const tmpBinLhs$33 /*:array*/ = [];
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:array*/ = [];
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:array*/ = [];
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
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
const tmpBinLhs$39 /*:array*/ = [];
const tmpArrElement$39 /*:boolean*/ = tmpBinLhs$39 in x;
const tmpBinLhs$41 /*:array*/ = [];
const tmpArrElement$41 /*:boolean*/ = tmpBinLhs$41 instanceof x;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = [] ** x;
const tmpArrElement$1 = [] * x;
const tmpArrElement$3 = [] / x;
const tmpArrElement$5 = [] % x;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpArrElement$9 = [] - x;
const tmpArrElement$11 = [] << x;
const tmpArrElement$13 = [] >> x;
const tmpArrElement$15 = [] >>> x;
const tmpArrElement$17 = [] < x;
const tmpArrElement$19 = [] > x;
const tmpArrElement$21 = [] <= x;
const tmpArrElement$23 = [] >= x;
const tmpArrElement$25 = [] == x;
const tmpArrElement$27 = [] != x;
const tmpArrElement$29 = [] === x;
const tmpArrElement$31 = [] !== x;
const tmpArrElement$33 = [] & x;
const tmpArrElement$35 = [] ^ x;
const tmpArrElement$37 = [] | x;
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
const tmpArrElement$39 = [] in x;
const tmpArrElement$41 = [] instanceof x;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const arr = [
  [] ** x,
  [] * x,
  [] / x,
  [] % x,
  [] + x,
  [] - x,
  [] << x,
  [] >> x,
  [] >>> x,
  [] < x,
  [] > x,
  [] <= x,
  [] >= x,
  [] == x,
  [] != x,
  [] === x,
  [] !== x,
  [] & x,
  [] ^ x,
  [] | x,
];
$(arr);
const arr2 = [[] in x, [] instanceof x];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = [];
const tmpArrElement = tmpBinLhs ** x;
const tmpBinLhs$1 = [];
const tmpArrElement$1 = tmpBinLhs$1 * x;
const tmpBinLhs$3 = [];
const tmpArrElement$3 = tmpBinLhs$3 / x;
const tmpBinLhs$5 = [];
const tmpArrElement$5 = tmpBinLhs$5 % x;
const tmpBinLhs$7 = [];
const tmpArrElement$7 = tmpBinLhs$7 + x;
const tmpBinLhs$9 = [];
const tmpArrElement$9 = tmpBinLhs$9 - x;
const tmpBinLhs$11 = [];
const tmpArrElement$11 = tmpBinLhs$11 << x;
const tmpBinLhs$13 = [];
const tmpArrElement$13 = tmpBinLhs$13 >> x;
const tmpBinLhs$15 = [];
const tmpArrElement$15 = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 = [];
const tmpArrElement$17 = tmpBinLhs$17 < x;
const tmpBinLhs$19 = [];
const tmpArrElement$19 = tmpBinLhs$19 > x;
const tmpBinLhs$21 = [];
const tmpArrElement$21 = tmpBinLhs$21 <= x;
const tmpBinLhs$23 = [];
const tmpArrElement$23 = tmpBinLhs$23 >= x;
const tmpBinLhs$25 = [];
const tmpArrElement$25 = tmpBinLhs$25 == x;
const tmpBinLhs$27 = [];
const tmpArrElement$27 = tmpBinLhs$27 != x;
const tmpBinLhs$29 = [];
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpBinLhs$31 = [];
const tmpArrElement$31 = tmpBinLhs$31 !== x;
const tmpBinLhs$33 = [];
const tmpArrElement$33 = tmpBinLhs$33 & x;
const tmpBinLhs$35 = [];
const tmpArrElement$35 = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 = [];
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
const tmpBinLhs$39 = [];
const tmpArrElement$39 = tmpBinLhs$39 in x;
const tmpBinLhs$41 = [];
const tmpArrElement$41 = tmpBinLhs$41 instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = a ** x;
const c = [];
const d = c * x;
const e = [];
const f = e / x;
const g = [];
const h = g % x;
const i = $coerce( x, "plustr" );
const j = [];
const k = j - x;
const l = [];
const m = l << x;
const n = [];
const o = n >> x;
const p = [];
const q = p >>> x;
const r = [];
const s = r < x;
const t = [];
const u = t > x;
const v = [];
const w = v <= x;
const y = [];
const z = y >= x;
const ba = [];
const bb = ba == x;
const bc = [];
const bd = bc != x;
const be = [];
const bf = be === x;
const bg = [];
const bh = bg !== x;
const bi = [];
const bj = bi & x;
const bk = [];
const bl = bk ^ x;
const bm = [];
const bn = bm | x;
const bo = [ b, d, f, h, i, k, m, o, q, s, u, w, z, bb, bd, bf, bh, bj, bl, bn ];
$( bo );
const bp = [];
const bq = bp in x;
const br = [];
const bs = br instanceof x;
const bt = [ bq, bs ];
$( bt );
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
