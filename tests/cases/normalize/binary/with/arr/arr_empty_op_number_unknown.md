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
const tmpBinBothLhs /*:unknown*/ = x;
const tmpArrElement /*:number*/ = tmpBinBothLhs ** 0;
const tmpBinBothLhs$1 /*:unknown*/ = x;
const tmpArrElement$1 /*:number*/ = tmpBinBothLhs$1 * 0;
const tmpBinBothLhs$3 /*:unknown*/ = x;
const tmpArrElement$3 /*:number*/ = tmpBinBothLhs$3 / 0;
const tmpBinBothLhs$5 /*:unknown*/ = x;
const tmpArrElement$5 /*:number*/ = tmpBinBothLhs$5 % 0;
const tmpArrElement$7 /*:string*/ = $coerce(x, `plustr`);
const tmpBinBothLhs$9 /*:unknown*/ = x;
const tmpArrElement$9 /*:number*/ = tmpBinBothLhs$9 - 0;
const tmpBinBothLhs$11 /*:unknown*/ = x;
const tmpArrElement$11 /*:number*/ = tmpBinBothLhs$11 << 0;
const tmpBinBothLhs$13 /*:unknown*/ = x;
const tmpArrElement$13 /*:number*/ = tmpBinBothLhs$13 >> 0;
const tmpBinBothLhs$15 /*:unknown*/ = x;
const tmpArrElement$15 /*:number*/ = tmpBinBothLhs$15 >>> 0;
const tmpBinBothLhs$17 /*:unknown*/ = x;
const tmpArrElement$17 /*:boolean*/ = tmpBinBothLhs$17 < ``;
const tmpBinBothLhs$19 /*:unknown*/ = x;
const tmpArrElement$19 /*:boolean*/ = tmpBinBothLhs$19 > ``;
const tmpBinBothLhs$21 /*:unknown*/ = x;
const tmpArrElement$21 /*:boolean*/ = tmpBinBothLhs$21 <= ``;
const tmpBinBothLhs$23 /*:unknown*/ = x;
const tmpArrElement$23 /*:boolean*/ = tmpBinBothLhs$23 >= ``;
const tmpBinBothLhs$25 /*:unknown*/ = x;
const tmpBinBothRhs$25 /*:array*/ /*truthy*/ = [];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 /*:unknown*/ = x;
const tmpBinBothRhs$27 /*:array*/ /*truthy*/ = [];
const tmpArrElement$27 /*:boolean*/ = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$33 /*:unknown*/ = x;
tmpBinBothLhs$33 ** 0;
const tmpBinBothLhs$35 /*:unknown*/ = x;
const tmpArrElement$35 /*:number*/ /*^0*/ = tmpBinBothLhs$35 ^ 0;
const tmpBinBothLhs$37 /*:unknown*/ = x;
const tmpArrElement$37 /*:number*/ /*|0*/ = tmpBinBothLhs$37 | 0;
const arr /*:array*/ /*truthy*/ = [
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
x;
const tmpBinBothRhs$39 /*:array*/ /*truthy*/ = [];
const tmpBinBothRhs$41 /*:array*/ /*truthy*/ = [];
const tmpArrElement$39 /*:boolean*/ = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 /*:boolean*/ = tmpBinBothLhs$39 instanceof tmpBinBothRhs$41;
const arr2 /*:array*/ /*truthy*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + ``;
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
x;
const tmpBinBothRhs$39 = [];
const tmpBinBothRhs$41 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpArrElement$41 = tmpBinBothLhs$39 instanceof tmpBinBothRhs$41;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x;
const b = a ** 0;
const c = x;
const d = c * 0;
const e = x;
const f = e / 0;
const g = x;
const h = g % 0;
const i = $coerce( x, "plustr" );
const j = x;
const k = j - 0;
const l = x;
const m = l << 0;
const n = x;
const o = n >> 0;
const p = x;
const q = p >>> 0;
const r = x;
const s = r < "";
const t = x;
const u = t > "";
const v = x;
const w = v <= "";
const y = x;
const z = y >= "";
const ba = x;
const bb = [];
const bc = ba == bb;
const bd = x;
const be = [];
const bf = bd != be;
const bg = x;
bg ** 0;
const bh = x;
const bi = bh ^ 0;
const bj = x;
const bk = bj | 0;
const bl = [ b, d, f, h, i, k, m, o, q, s, u, w, z, bc, bf, false, true, 0, bi, bk ];
$( bl );
const bm = x;
x;
const bn = [];
const bo = [];
const bp = bm in bn;
const bq = bm instanceof bo;
const br = [ bp, bq ];
$( br );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = x;
const tmpBinBothRhs = [];
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = [];
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = [];
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = [];
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = [];
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = [];
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = [];
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = [];
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = [];
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = [];
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = [];
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = [];
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = [];
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = [];
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = [];
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = [];
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = [];
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = [];
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = [];
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = [];
const tmpArrElement$37 = tmpBinBothLhs$37 | tmpBinBothRhs$37;
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
const tmpBinBothLhs$39 = x;
const tmpBinBothRhs$39 = [];
const tmpArrElement$39 = tmpBinBothLhs$39 in tmpBinBothRhs$39;
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = [];
const tmpArrElement$41 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````


## Todos triggered


- (todo) array reads var statement with init BinaryExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
