# Preval test case

# number_unknown_op_arr_numbers.md

> Normalize > Binary > With > Arr > Number unknown op arr numbers
>
> Deal with certain primitive with binary ops

## Options

- loopProtectLimit=1000

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
const tmpBinBothRhs$27 /*:array*/ = [10, 20, 30];
const tmpArrElement$25 /*:boolean*/ = x == tmpBinBothRhs$27;
const tmpBinBothRhs$29 /*:array*/ = [10, 20, 30];
const tmpArrElement$27 /*:boolean*/ = x != tmpBinBothRhs$29;
const tmpArrElement$7 /*:string*/ = `${x}10,20,30`;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < `10,20,30`;
const tmpArrElement$19 /*:boolean*/ = x > `10,20,30`;
const tmpArrElement$21 /*:boolean*/ = x <= `10,20,30`;
const tmpArrElement$23 /*:boolean*/ = x >= `10,20,30`;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
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
const tmpArrElement$25 = x == [10, 20, 30];
const tmpArrElement$27 = x != [10, 20, 30];
const tmpArrElement$7 = `${x}10,20,30`;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `10,20,30`;
const tmpArrElement$19 = x > `10,20,30`;
const tmpArrElement$21 = x <= `10,20,30`;
const tmpArrElement$23 = x >= `10,20,30`;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
const tmpArrElement$39 = x in tmpBinBothRhs$41;
const tmpArrElement$41 = x instanceof tmpBinBothRhs$43;
$([tmpArrElement$39, tmpArrElement$41]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
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


None


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
