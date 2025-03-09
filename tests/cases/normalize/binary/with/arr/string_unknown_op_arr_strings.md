# Preval test case

# string_unknown_op_arr_strings.md

> Normalize > Binary > With > Arr > String unknown op arr strings
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = `${$('')}`;
const arr = [
  x ** ['a', 'b', 'c'],
  x * ['a', 'b', 'c'],
  x / ['a', 'b', 'c'],
  x % ['a', 'b', 'c'],
  x + ['a', 'b', 'c'],
  x - ['a', 'b', 'c'],
  x << ['a', 'b', 'c'],
  x >> ['a', 'b', 'c'],
  x >>> ['a', 'b', 'c'],
  x < ['a', 'b', 'c'],
  x > ['a', 'b', 'c'],
  x <= ['a', 'b', 'c'],
  x >= ['a', 'b', 'c'],
  x == ['a', 'b', 'c'],
  x != ['a', 'b', 'c'],
  x === ['a', 'b', 'c'],
  x !== ['a', 'b', 'c'],
  x & ['a', 'b', 'c'],
  x ^ ['a', 'b', 'c'],
  x | ['a', 'b', 'c'],
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
const tmpCalleeParam /*:unknown*/ = $(``);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpBinBothRhs$1 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement /*:number*/ = tmpBinBothRhs ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$1 /*:number*/ = tmpBinBothRhs * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$3 /*:number*/ = tmpBinBothRhs / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$5 /*:number*/ = tmpBinBothRhs % tmpBinBothRhs$7;
const tmpBinBothRhs$11 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$9 /*:number*/ = tmpBinBothRhs - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$11 /*:number*/ = tmpBinBothRhs << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$13 /*:number*/ = tmpBinBothRhs >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$15 /*:number*/ = tmpBinBothRhs >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$17 /*:boolean*/ = tmpBinBothRhs < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$19 /*:boolean*/ = tmpBinBothRhs > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$21 /*:boolean*/ = tmpBinBothRhs <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$23 /*:boolean*/ = tmpBinBothRhs >= tmpBinBothRhs$25;
const tmpBinBothRhs$27 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothRhs == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$27 /*:boolean*/ = tmpBinBothRhs != tmpBinBothRhs$29;
const tmpBinBothRhs$35 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$33 /*:number*/ = tmpBinBothRhs & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$35 /*:number*/ = tmpBinBothRhs ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:array*/ = [`a`, `b`, `c`];
const tmpArrElement$37 /*:number*/ = tmpBinBothRhs | tmpBinBothRhs$39;
const tmpArrElement$7 /*:string*/ = `${tmpBinBothRhs}a,b,c`;
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
const tmpArrElement$39 /*:boolean*/ = tmpBinBothRhs in tmpBinBothRhs$41;
const tmpArrElement$41 /*:boolean*/ = tmpBinBothRhs instanceof tmpBinBothRhs$43;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $coerce($(``), `string`);
const tmpArrElement = tmpBinBothRhs ** [`a`, `b`, `c`];
const tmpArrElement$1 = tmpBinBothRhs * [`a`, `b`, `c`];
const tmpArrElement$3 = tmpBinBothRhs / [`a`, `b`, `c`];
const tmpArrElement$5 = tmpBinBothRhs % [`a`, `b`, `c`];
const tmpArrElement$9 = tmpBinBothRhs - [`a`, `b`, `c`];
const tmpArrElement$11 = tmpBinBothRhs << [`a`, `b`, `c`];
const tmpArrElement$13 = tmpBinBothRhs >> [`a`, `b`, `c`];
const tmpArrElement$15 = tmpBinBothRhs >>> [`a`, `b`, `c`];
const tmpArrElement$17 = tmpBinBothRhs < [`a`, `b`, `c`];
const tmpArrElement$19 = tmpBinBothRhs > [`a`, `b`, `c`];
const tmpArrElement$21 = tmpBinBothRhs <= [`a`, `b`, `c`];
const tmpArrElement$23 = tmpBinBothRhs >= [`a`, `b`, `c`];
const tmpArrElement$25 = tmpBinBothRhs == [`a`, `b`, `c`];
const tmpArrElement$27 = tmpBinBothRhs != [`a`, `b`, `c`];
const tmpArrElement$33 = tmpBinBothRhs & [`a`, `b`, `c`];
const tmpArrElement$35 = tmpBinBothRhs ^ [`a`, `b`, `c`];
const tmpArrElement$37 = tmpBinBothRhs | [`a`, `b`, `c`];
const tmpArrElement$7 = `${tmpBinBothRhs}a,b,c`;
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
const tmpArrElement$39 = tmpBinBothRhs in tmpBinBothRhs$41;
const tmpArrElement$41 = tmpBinBothRhs instanceof tmpBinBothRhs$43;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const x = `` + $coerce($(``), `string`) + ``;
const arr = [
  x ** [`a`, `b`, `c`],
  x * [`a`, `b`, `c`],
  x / [`a`, `b`, `c`],
  x % [`a`, `b`, `c`],
  x + [`a`, `b`, `c`],
  x - [`a`, `b`, `c`],
  x << [`a`, `b`, `c`],
  x >> [`a`, `b`, `c`],
  x >>> [`a`, `b`, `c`],
  x < [`a`, `b`, `c`],
  x > [`a`, `b`, `c`],
  x <= [`a`, `b`, `c`],
  x >= [`a`, `b`, `c`],
  x == [`a`, `b`, `c`],
  x != [`a`, `b`, `c`],
  x === [`a`, `b`, `c`],
  x !== [`a`, `b`, `c`],
  x & [`a`, `b`, `c`],
  x ^ [`a`, `b`, `c`],
  x | [`a`, `b`, `c`],
];
$(arr);
const arr2 = [x in [], x instanceof []];
$(arr2);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCalleeParam = $(``);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const x = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [`a`, `b`, `c`];
const tmpArrElement = tmpBinBothLhs$1 ** tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [`a`, `b`, `c`];
const tmpArrElement$1 = tmpBinBothLhs$3 * tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [`a`, `b`, `c`];
const tmpArrElement$3 = tmpBinBothLhs$5 / tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [`a`, `b`, `c`];
const tmpArrElement$5 = tmpBinBothLhs$7 % tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [`a`, `b`, `c`];
const tmpArrElement$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [`a`, `b`, `c`];
const tmpArrElement$9 = tmpBinBothLhs$11 - tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [`a`, `b`, `c`];
const tmpArrElement$11 = tmpBinBothLhs$13 << tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [`a`, `b`, `c`];
const tmpArrElement$13 = tmpBinBothLhs$15 >> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [`a`, `b`, `c`];
const tmpArrElement$15 = tmpBinBothLhs$17 >>> tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [`a`, `b`, `c`];
const tmpArrElement$17 = tmpBinBothLhs$19 < tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [`a`, `b`, `c`];
const tmpArrElement$19 = tmpBinBothLhs$21 > tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [`a`, `b`, `c`];
const tmpArrElement$21 = tmpBinBothLhs$23 <= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [`a`, `b`, `c`];
const tmpArrElement$23 = tmpBinBothLhs$25 >= tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [`a`, `b`, `c`];
const tmpArrElement$25 = tmpBinBothLhs$27 == tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [`a`, `b`, `c`];
const tmpArrElement$27 = tmpBinBothLhs$29 != tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [`a`, `b`, `c`];
const tmpArrElement$29 = tmpBinBothLhs$31 === tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [`a`, `b`, `c`];
const tmpArrElement$31 = tmpBinBothLhs$33 !== tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [`a`, `b`, `c`];
const tmpArrElement$33 = tmpBinBothLhs$35 & tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [`a`, `b`, `c`];
const tmpArrElement$35 = tmpBinBothLhs$37 ^ tmpBinBothRhs$37;
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = [`a`, `b`, `c`];
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
const a = $( "" );
const b = $coerce( a, "string" );
const c = [ "a", "b", "c" ];
const d = b ** c;
const e = [ "a", "b", "c" ];
const f = b * e;
const g = [ "a", "b", "c" ];
const h = b / g;
const i = [ "a", "b", "c" ];
const j = b % i;
const k = [ "a", "b", "c" ];
const l = b - k;
const m = [ "a", "b", "c" ];
const n = b << m;
const o = [ "a", "b", "c" ];
const p = b >> o;
const q = [ "a", "b", "c" ];
const r = b >>> q;
const s = [ "a", "b", "c" ];
const t = b < s;
const u = [ "a", "b", "c" ];
const v = b > u;
const w = [ "a", "b", "c" ];
const x = b <= w;
const y = [ "a", "b", "c" ];
const z = b >= y;
const ba = [ "a", "b", "c" ];
const bb = b == ba;
const bc = [ "a", "b", "c" ];
const bd = b != bc;
const be = [ "a", "b", "c" ];
const bf = b & be;
const bg = [ "a", "b", "c" ];
const bh = b ^ bg;
const bi = [ "a", "b", "c" ];
const bj = b | bi;
const bk = `${b}a,b,c`;
const bl = [ d, f, h, j, bk, l, n, p, r, t, v, x, z, bb, bd, false, true, bf, bh, bj ];
$( bl );
const bm = [];
const bn = [];
const bo = b in bm;
const bp = b instanceof bn;
const bq = [ bo, bp ];
$( bq );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - 2: [NaN, NaN, NaN, NaN, 'a,b,c', NaN, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
