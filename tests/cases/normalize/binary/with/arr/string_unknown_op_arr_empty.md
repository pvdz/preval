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
const tmpBinBothRhs$27 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothRhs == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [];
const tmpArrElement$27 /*:boolean*/ = tmpBinBothRhs != tmpBinBothRhs$29;
const tmpArrElement /*:number*/ = tmpBinBothRhs ** 0;
const tmpArrElement$1 /*:number*/ = tmpBinBothRhs * 0;
const tmpArrElement$3 /*:number*/ = tmpBinBothRhs / 0;
const tmpArrElement$5 /*:number*/ = tmpBinBothRhs % 0;
const tmpArrElement$9 /*:number*/ = tmpBinBothRhs - 0;
const tmpArrElement$11 /*:number*/ = tmpBinBothRhs << 0;
const tmpArrElement$13 /*:number*/ = tmpBinBothRhs >> 0;
const tmpArrElement$15 /*:number*/ = tmpBinBothRhs >>> 0;
const tmpArrElement$17 /*:boolean*/ = tmpBinBothRhs < ``;
const tmpArrElement$19 /*:boolean*/ = tmpBinBothRhs > ``;
const tmpArrElement$21 /*:boolean*/ = tmpBinBothRhs <= ``;
const tmpArrElement$23 /*:boolean*/ = tmpBinBothRhs >= ``;
const tmpArrElement$35 /*:number*/ = tmpBinBothRhs ^ 0;
const tmpArrElement$37 /*:number*/ = tmpBinBothRhs | 0;
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
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
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
const tmpArrElement$25 = tmpBinBothRhs == [];
const tmpArrElement$27 = tmpBinBothRhs != [];
const tmpArrElement = tmpBinBothRhs ** 0;
const tmpArrElement$1 = tmpBinBothRhs * 0;
const tmpArrElement$3 = tmpBinBothRhs / 0;
const tmpArrElement$5 = tmpBinBothRhs % 0;
const tmpArrElement$9 = tmpBinBothRhs - 0;
const tmpArrElement$11 = tmpBinBothRhs << 0;
const tmpArrElement$13 = tmpBinBothRhs >> 0;
const tmpArrElement$15 = tmpBinBothRhs >>> 0;
const tmpArrElement$17 = tmpBinBothRhs < ``;
const tmpArrElement$19 = tmpBinBothRhs > ``;
const tmpArrElement$21 = tmpBinBothRhs <= ``;
const tmpArrElement$23 = tmpBinBothRhs >= ``;
const tmpArrElement$35 = tmpBinBothRhs ^ 0;
const tmpArrElement$37 = tmpBinBothRhs | 0;
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
  tmpArrElement$25,
  tmpArrElement$27,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpBinBothRhs$41 = [];
const tmpBinBothRhs$43 = [];
const tmpArrElement$39 = tmpBinBothRhs in tmpBinBothRhs$41;
const tmpArrElement$41 = tmpBinBothRhs instanceof tmpBinBothRhs$43;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "" );
const b = $coerce( a, "string" );
const c = [];
const d = b == c;
const e = [];
const f = b != e;
const g = b ** 0;
const h = b * 0;
const i = b / 0;
const j = b % 0;
const k = b - 0;
const l = b << 0;
const m = b >> 0;
const n = b >>> 0;
const o = b < "";
const p = b > "";
const q = b <= "";
const r = b >= "";
const s = b ^ 0;
const t = b | 0;
const u = [ g, h, i, j, b, k, l, m, n, o, p, q, r, d, f, false, true, 0, s, t ];
$( u );
const v = [];
const w = [];
const x = b in v;
const y = b instanceof w;
const z = [ x, y ];
$( z );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: [1, 0, NaN, NaN, '', 0, 0, 0, 0, false, false, true, true, true, false, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
