# Preval test case

# arr_empty_op_number_unknown.md

> Normalize > Binary > With > Arr > Arr empty op number unknown
>
> Deal with certain primitive with binary ops

## Options

- globals: x
- loopProtectLimit=1000

## Input

`````js filename=intro
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
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$7 /*:string*/ = $coerce(x, `plustr`);
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < ``;
const tmpArrElement$19 /*:boolean*/ = x > ``;
const tmpArrElement$21 /*:boolean*/ = x <= ``;
const tmpArrElement$23 /*:boolean*/ = x >= ``;
const tmpBinBothLhs$25 /*:unknown*/ = x;
const tmpBinBothRhs$25 /*:array*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 /*:unknown*/ = x;
const tmpBinBothRhs$27 /*:array*/ = [];
const tmpArrElement$27 /*:boolean*/ = tmpBinBothLhs$27 != tmpBinBothRhs$27;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothLhs$39 /*:unknown*/ = x;
const tmpBinBothLhs$41 /*:unknown*/ = x;
const tmpBinBothRhs$39 /*:array*/ = [];
const tmpBinBothRhs$41 /*:array*/ = [];
const tmpArrElement$39 /*:boolean*/ = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 /*:boolean*/ = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = $coerce(x, `plustr`);
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < ``;
const tmpArrElement$19 = x > ``;
const tmpArrElement$21 = x <= ``;
const tmpArrElement$23 = x >= ``;
const tmpArrElement$25 = x == [];
const tmpArrElement$27 = x != [];
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
const tmpBinBothLhs$39 = x;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$39 = [];
const tmpBinBothRhs$41 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x ** 0;
const b = x * 0;
const c = x / 0;
const d = x % 0;
const e = $coerce( x, "plustr" );
const f = x - 0;
const g = x << 0;
const h = x >> 0;
const i = x >>> 0;
const j = x < "";
const k = x > "";
const l = x <= "";
const m = x >= "";
const n = x;
const o = [];
const p = n == o;
const q = x;
const r = [];
const s = q != r;
x ** 0;
const t = x ^ 0;
const u = x | 0;
const v = [ a, b, c, d, e, f, g, h, i, j, k, l, m, p, s, false, true, 0, t, u ];
$( v );
const w = x;
const y = x;
const z = [];
const ba = [];
const bb = w in z;
const bc = y instanceof ba;
const bd = [ bb, bc ];
$( bd );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
