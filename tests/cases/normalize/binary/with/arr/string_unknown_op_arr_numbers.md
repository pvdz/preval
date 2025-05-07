# Preval test case

# string_unknown_op_arr_numbers.md

> Normalize > Binary > With > Arr > String unknown op arr numbers
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
const x = `${$('')}`;
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
const tmpCalleeParam /*:unknown*/ = $(``);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpBinBothRhs$27 /*:array*/ = [10, 20, 30];
const tmpArrElement$25 /*:boolean*/ = tmpBinBothRhs == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [10, 20, 30];
const tmpArrElement$27 /*:boolean*/ = tmpBinBothRhs != tmpBinBothRhs$29;
const tmpArrElement$7 /*:string*/ = `${tmpBinBothRhs}10,20,30`;
const tmpArrElement$11 /*:number*/ = tmpBinBothRhs << 0;
const tmpArrElement$13 /*:number*/ = tmpBinBothRhs >> 0;
const tmpArrElement$15 /*:number*/ = tmpBinBothRhs >>> 0;
const tmpArrElement$17 /*:boolean*/ = tmpBinBothRhs < `10,20,30`;
const tmpArrElement$19 /*:boolean*/ = tmpBinBothRhs > `10,20,30`;
const tmpArrElement$21 /*:boolean*/ = tmpBinBothRhs <= `10,20,30`;
const tmpArrElement$23 /*:boolean*/ = tmpBinBothRhs >= `10,20,30`;
const tmpArrElement$35 /*:number*/ = tmpBinBothRhs ^ 0;
const tmpArrElement$37 /*:number*/ = tmpBinBothRhs | 0;
const arr /*:array*/ = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
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
const tmpArrElement$25 = tmpBinBothRhs == [10, 20, 30];
const tmpArrElement$27 = tmpBinBothRhs != [10, 20, 30];
const tmpArrElement$7 = `${tmpBinBothRhs}10,20,30`;
const tmpArrElement$11 = tmpBinBothRhs << 0;
const tmpArrElement$13 = tmpBinBothRhs >> 0;
const tmpArrElement$15 = tmpBinBothRhs >>> 0;
const tmpArrElement$17 = tmpBinBothRhs < `10,20,30`;
const tmpArrElement$19 = tmpBinBothRhs > `10,20,30`;
const tmpArrElement$21 = tmpBinBothRhs <= `10,20,30`;
const tmpArrElement$23 = tmpBinBothRhs >= `10,20,30`;
const tmpArrElement$35 = tmpBinBothRhs ^ 0;
const tmpArrElement$37 = tmpBinBothRhs | 0;
$([
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
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
const c = [ 10, 20, 30 ];
const d = b == c;
const e = [ 10, 20, 30 ];
const f = b != e;
const g = `${b}10,20,30`;
const h = b << 0;
const i = b >> 0;
const j = b >>> 0;
const k = b < "10,20,30";
const l = b > "10,20,30";
const m = b <= "10,20,30";
const n = b >= "10,20,30";
const o = b ^ 0;
const p = b | 0;
const q = [ NaN, NaN, NaN, NaN, g, NaN, h, i, j, k, l, m, n, d, f, false, true, 0, o, p ];
$( q );
const r = [];
const s = [];
const t = b in r;
const u = b instanceof s;
const v = [ t, u ];
$( v );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: [NaN, NaN, NaN, NaN, '10,20,30', NaN, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
