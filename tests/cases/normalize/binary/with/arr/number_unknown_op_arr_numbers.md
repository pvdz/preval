# Preval test case

# number_unknown_op_arr_numbers.md

> Normalize > Binary > With > Arr > Number unknown op arr numbers
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);
const arr = [
  x ** [10, 20, 30],
  x * [10, 20, 30],
  x / [10, 20, 30],
  x % [10, 20, 30],
  x + [10, 20, 30],
  x - [10, 20, 30],
  x << [10, 20, 30],
  x >> [10, 20, 30],
  x >>> [10, 20, 30],
  x < [10, 20, 30],
  x > [10, 20, 30],
  x <= [10, 20, 30],
  x >= [10, 20, 30],
  x == [10, 20, 30],
  x != [10, 20, 30],
  x === [10, 20, 30],
  x !== [10, 20, 30],
  x & [10, 20, 30],
  x ^ [10, 20, 30],
  x | [10, 20, 30],
];
$(arr);

const arr2 = [
  x in [],
  x instanceof [],
];
$(arr2);
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpBinBothRhs$1 /*:array*/ = [10, 20, 30];
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:array*/ = [10, 20, 30];
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:array*/ = [10, 20, 30];
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:array*/ = [10, 20, 30];
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$7;
const tmpStringConcatR /*:string*/ = $coerce(x, `string`);
const tmpBinBothRhs$11 /*:array*/ = [10, 20, 30];
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:array*/ = [10, 20, 30];
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:array*/ = [10, 20, 30];
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:array*/ = [10, 20, 30];
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:array*/ = [10, 20, 30];
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:array*/ = [10, 20, 30];
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:array*/ = [10, 20, 30];
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:array*/ = [10, 20, 30];
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:array*/ = [10, 20, 30];
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [10, 20, 30];
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpBinBothRhs$35 /*:array*/ = [10, 20, 30];
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:array*/ = [10, 20, 30];
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:array*/ = [10, 20, 30];
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$39;
const tmpArrElement$7 /*:string*/ = `${tmpStringConcatR}10,20,30`;
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothRhs$41 /*:array*/ = [];
const tmpBinBothRhs$43 /*:array*/ = [];
const tmpArrElement$39 /*:boolean*/ = x in tmpBinBothRhs$41;
const tmpArrElement$41 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpArrElement = x ** [10, 20, 30];
const tmpArrElement$1 = x * [10, 20, 30];
const tmpArrElement$3 = x / [10, 20, 30];
const tmpArrElement$5 = x % [10, 20, 30];
const tmpStringConcatR = $coerce(x, `string`);
const tmpArrElement$9 = x - [10, 20, 30];
const tmpArrElement$11 = x << [10, 20, 30];
const tmpArrElement$13 = x >> [10, 20, 30];
const tmpArrElement$15 = x >>> [10, 20, 30];
const tmpArrElement$17 = x < [10, 20, 30];
const tmpArrElement$19 = x > [10, 20, 30];
const tmpArrElement$21 = x <= [10, 20, 30];
const tmpArrElement$23 = x >= [10, 20, 30];
const tmpArrElement$25 = x == [10, 20, 30];
const tmpArrElement$27 = x != [10, 20, 30];
const tmpArrElement$33 = x & [10, 20, 30];
const tmpArrElement$35 = x ^ [10, 20, 30];
const tmpArrElement$37 = x | [10, 20, 30];
const tmpArrElement$7 = `${tmpStringConcatR}10,20,30`;
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpBinBothRhs$41 = [];
const tmpBinBothRhs$43 = [];
const tmpArrElement$39 = x in tmpBinBothRhs$41;
const tmpArrElement$41 = x instanceof tmpBinBothRhs$43;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(1);
const arr = [
  x ** [10, 20, 30],
  x * [10, 20, 30],
  x / [10, 20, 30],
  x % [10, 20, 30],
  x + [10, 20, 30],
  x - [10, 20, 30],
  x << [10, 20, 30],
  x >> [10, 20, 30],
  x >>> [10, 20, 30],
  x < [10, 20, 30],
  x > [10, 20, 30],
  x <= [10, 20, 30],
  x >= [10, 20, 30],
  x == [10, 20, 30],
  x != [10, 20, 30],
  x === [10, 20, 30],
  x !== [10, 20, 30],
  x & [10, 20, 30],
  x ^ [10, 20, 30],
  x | [10, 20, 30],
];
$(arr);
const arr2 = [x in [], x instanceof []];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [10, 20, 30];
const tmpArrElement = tmpBinBothLhs$1 ** tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [10, 20, 30];
const tmpArrElement$1 = tmpBinBothLhs$3 * tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [10, 20, 30];
const tmpArrElement$3 = tmpBinBothLhs$5 / tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [10, 20, 30];
const tmpArrElement$5 = tmpBinBothLhs$7 % tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [10, 20, 30];
const tmpArrElement$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [10, 20, 30];
const tmpArrElement$9 = tmpBinBothLhs$11 - tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [10, 20, 30];
const tmpArrElement$11 = tmpBinBothLhs$13 << tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [10, 20, 30];
const tmpArrElement$13 = tmpBinBothLhs$15 >> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [10, 20, 30];
const tmpArrElement$15 = tmpBinBothLhs$17 >>> tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [10, 20, 30];
const tmpArrElement$17 = tmpBinBothLhs$19 < tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [10, 20, 30];
const tmpArrElement$19 = tmpBinBothLhs$21 > tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [10, 20, 30];
const tmpArrElement$21 = tmpBinBothLhs$23 <= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [10, 20, 30];
const tmpArrElement$23 = tmpBinBothLhs$25 >= tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [10, 20, 30];
const tmpArrElement$25 = tmpBinBothLhs$27 == tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [10, 20, 30];
const tmpArrElement$27 = tmpBinBothLhs$29 != tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [10, 20, 30];
const tmpArrElement$29 = tmpBinBothLhs$31 === tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [10, 20, 30];
const tmpArrElement$31 = tmpBinBothLhs$33 !== tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [10, 20, 30];
const tmpArrElement$33 = tmpBinBothLhs$35 & tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [10, 20, 30];
const tmpArrElement$35 = tmpBinBothLhs$37 ^ tmpBinBothRhs$37;
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = [10, 20, 30];
const tmpArrElement$37 = tmpBinBothLhs$39 | tmpBinBothRhs$39;
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
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = [];
const tmpArrElement$39 = tmpBinBothLhs$41 in tmpBinBothRhs$41;
const tmpBinBothLhs$43 = x;
const tmpBinBothRhs$43 = [];
const tmpArrElement$41 = tmpBinBothLhs$43 instanceof tmpBinBothRhs$43;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = [ 10, 20, 30 ];
const d = b ** c;
const e = [ 10, 20, 30 ];
const f = b * e;
const g = [ 10, 20, 30 ];
const h = b / g;
const i = [ 10, 20, 30 ];
const j = b % i;
const k = $coerce( b, "string" );
const l = [ 10, 20, 30 ];
const m = b - l;
const n = [ 10, 20, 30 ];
const o = b << n;
const p = [ 10, 20, 30 ];
const q = b >> p;
const r = [ 10, 20, 30 ];
const s = b >>> r;
const t = [ 10, 20, 30 ];
const u = b < t;
const v = [ 10, 20, 30 ];
const w = b > v;
const x = [ 10, 20, 30 ];
const y = b <= x;
const z = [ 10, 20, 30 ];
const ba = b >= z;
const bb = [ 10, 20, 30 ];
const bc = b == bb;
const bd = [ 10, 20, 30 ];
const be = b != bd;
const bf = [ 10, 20, 30 ];
const bg = b & bf;
const bh = [ 10, 20, 30 ];
const bi = b ^ bh;
const bj = [ 10, 20, 30 ];
const bk = b | bj;
const bl = `${k}10,20,30`;
const bm = [ d, f, h, j, bl, m, o, q, s, u, w, y, ba, bc, be, false, true, bg, bi, bk ];
$( bm );
const bn = [];
const bo = [];
const bp = b in bn;
const bq = b instanceof bo;
const br = [ bp, bq ];
$( br );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, '110,20,30', NaN, 1, 1, 1, false, false, false, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
