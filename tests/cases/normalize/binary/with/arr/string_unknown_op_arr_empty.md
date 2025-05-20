# Preval test case

# string_unknown_op_arr_empty.md

> Normalize > Binary > With > Arr > String unknown op arr empty
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

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
const x /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpBinBothRhs$27 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [];
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < ``;
const tmpArrElement$19 /*:boolean*/ = x > ``;
const tmpArrElement$21 /*:boolean*/ = x <= ``;
const tmpArrElement$23 /*:boolean*/ = x >= ``;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const arr /*:array*/ = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  x,
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
const tmpArrElement$39 /*:boolean*/ = x in tmpBinBothRhs$41;
const tmpArrElement$41 /*:boolean*/ = x instanceof tmpBinBothRhs$43;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(``), `string`);
const tmpArrElement$25 = x == [];
const tmpArrElement$27 = x != [];
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < ``;
const tmpArrElement$19 = x > ``;
const tmpArrElement$21 = x <= ``;
const tmpArrElement$23 = x >= ``;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
$([
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  x,
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
const tmpArrElement$39 = x in tmpBinBothRhs$41;
const tmpArrElement$41 = x instanceof tmpBinBothRhs$43;
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


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


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
