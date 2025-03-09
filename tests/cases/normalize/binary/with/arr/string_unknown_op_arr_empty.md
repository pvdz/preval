# Preval test case

# string_unknown_op_arr_empty.md

> Normalize > Binary > With > Arr > String unknown op arr empty
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = `${$('')}`;
const arr = [
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
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
const tmpBinBothRhs$1 /*:array*/ = [];
const tmpArrElement /*:number*/ = tmpBinBothRhs ** tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:array*/ = [];
const tmpArrElement$1 /*:number*/ = tmpBinBothRhs * tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:array*/ = [];
const tmpArrElement$3 /*:number*/ = tmpBinBothRhs / tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:array*/ = [];
const tmpArrElement$5 /*:number*/ = tmpBinBothRhs % tmpBinBothRhs$7;
const tmpBinBothRhs$11 /*:array*/ = [];
const tmpArrElement$9 /*:number*/ = tmpBinBothRhs - tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:array*/ = [];
const tmpArrElement$11 /*:number*/ = tmpBinBothRhs << tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:array*/ = [];
const tmpArrElement$13 /*:number*/ = tmpBinBothRhs >> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:array*/ = [];
const tmpArrElement$15 /*:number*/ = tmpBinBothRhs >>> tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:array*/ = [];
const tmpArrElement$17 /*:boolean*/ = tmpBinBothRhs < tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:array*/ = [];
const tmpArrElement$19 /*:boolean*/ = tmpBinBothRhs > tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:array*/ = [];
const tmpArrElement$21 /*:boolean*/ = tmpBinBothRhs <= tmpBinBothRhs$23;
const tmpBinBothRhs$25 /*:array*/ = [];
const tmpArrElement$23 /*:boolean*/ = tmpBinBothRhs >= tmpBinBothRhs$25;
const tmpBinBothRhs$35 /*:array*/ = [];
const tmpArrElement$33 /*:number*/ = tmpBinBothRhs & tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:array*/ = [];
const tmpArrElement$35 /*:number*/ = tmpBinBothRhs ^ tmpBinBothRhs$37;
const tmpBinBothRhs$39 /*:array*/ = [];
const tmpArrElement$37 /*:number*/ = tmpBinBothRhs | tmpBinBothRhs$39;
const arr /*:array*/ = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpBinBothRhs,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  false,
  true,
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
const tmpArrElement = tmpBinBothRhs ** [];
const tmpArrElement$1 = tmpBinBothRhs * [];
const tmpArrElement$3 = tmpBinBothRhs / [];
const tmpArrElement$5 = tmpBinBothRhs % [];
const tmpArrElement$9 = tmpBinBothRhs - [];
const tmpArrElement$11 = tmpBinBothRhs << [];
const tmpArrElement$13 = tmpBinBothRhs >> [];
const tmpArrElement$15 = tmpBinBothRhs >>> [];
const tmpArrElement$17 = tmpBinBothRhs < [];
const tmpArrElement$19 = tmpBinBothRhs > [];
const tmpArrElement$21 = tmpBinBothRhs <= [];
const tmpArrElement$23 = tmpBinBothRhs >= [];
const tmpArrElement$33 = tmpBinBothRhs & [];
const tmpArrElement$35 = tmpBinBothRhs ^ [];
const tmpArrElement$37 = tmpBinBothRhs | [];
$([
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpBinBothRhs,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  false,
  true,
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
  x ** [],
  x * [],
  x / [],
  x % [],
  x + [],
  x - [],
  x << [],
  x >> [],
  x >>> [],
  x < [],
  x > [],
  x <= [],
  x >= [],
  x == [],
  x != [],
  x === [],
  x !== [],
  x & [],
  x ^ [],
  x | [],
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
const tmpBinBothRhs$1 = [];
const tmpArrElement = tmpBinBothLhs$1 ** tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [];
const tmpArrElement$1 = tmpBinBothLhs$3 * tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [];
const tmpArrElement$3 = tmpBinBothLhs$5 / tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [];
const tmpArrElement$5 = tmpBinBothLhs$7 % tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [];
const tmpArrElement$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [];
const tmpArrElement$9 = tmpBinBothLhs$11 - tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [];
const tmpArrElement$11 = tmpBinBothLhs$13 << tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [];
const tmpArrElement$13 = tmpBinBothLhs$15 >> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [];
const tmpArrElement$15 = tmpBinBothLhs$17 >>> tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [];
const tmpArrElement$17 = tmpBinBothLhs$19 < tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [];
const tmpArrElement$19 = tmpBinBothLhs$21 > tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [];
const tmpArrElement$21 = tmpBinBothLhs$23 <= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [];
const tmpArrElement$23 = tmpBinBothLhs$25 >= tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [];
const tmpArrElement$25 = tmpBinBothLhs$27 == tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [];
const tmpArrElement$27 = tmpBinBothLhs$29 != tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [];
const tmpArrElement$29 = tmpBinBothLhs$31 === tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [];
const tmpArrElement$31 = tmpBinBothLhs$33 !== tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [];
const tmpArrElement$33 = tmpBinBothLhs$35 & tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [];
const tmpArrElement$35 = tmpBinBothLhs$37 ^ tmpBinBothRhs$37;
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = [];
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
const c = [];
const d = b ** c;
const e = [];
const f = b * e;
const g = [];
const h = b / g;
const i = [];
const j = b % i;
const k = [];
const l = b - k;
const m = [];
const n = b << m;
const o = [];
const p = b >> o;
const q = [];
const r = b >>> q;
const s = [];
const t = b < s;
const u = [];
const v = b > u;
const w = [];
const x = b <= w;
const y = [];
const z = b >= y;
const ba = [];
const bb = b & ba;
const bc = [];
const bd = b ^ bc;
const be = [];
const bf = b | be;
const bg = [ d, f, h, j, b, l, n, p, r, t, v, x, z, false, true, false, true, bb, bd, bf ];
$( bg );
const bh = [];
const bi = [];
const bj = b in bh;
const bk = b instanceof bi;
const bl = [ bj, bk ];
$( bl );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - 2: [1, 0, NaN, NaN, '', 0, 0, 0, 0, false, false, true, true, true, false, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: ''
 - 2: [1, 0, NaN, NaN, '', 0, 0, 0, 0, false, false, true, true, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Denormalized calls: BAD!!
 - 1: ''
 - 2: [1, 0, NaN, NaN, '', 0, 0, 0, 0, false, false, true, true, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")
