# Preval test case

# obj_right.md

> Normalize > Binary > With > Obj > Obj right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  {} ** x,
  {} * x,
  {} / x,
  {} % x,
  {} + x,
  {} - x,
  {} << x,
  {} >> x,
  {} >>> x,
  {} < x,
  {} > x,
  {} <= x,
  {} >= x,
  {} == x,
  {} != x,
  {} === x,
  {} !== x,
  {} & x,
  {} ^ x,
  {} | x,
];
$(arr);
$({} in x);
$({} instanceof x);
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:object*/ = {};
const x /*:object*/ = {
  toString() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement /*:number*/ = tmpBinLhs ** x;
const tmpBinLhs$1 /*:object*/ = {};
const tmpArrElement$1 /*:number*/ = tmpBinLhs$1 * x;
const tmpBinLhs$3 /*:object*/ = {};
const tmpArrElement$3 /*:number*/ = tmpBinLhs$3 / x;
const tmpBinLhs$5 /*:object*/ = {};
const tmpArrElement$5 /*:number*/ = tmpBinLhs$5 % x;
const tmpBinLhs$7 /*:object*/ = {};
const tmpArrElement$7 /*:primitive*/ = tmpBinLhs$7 + x;
const tmpBinLhs$9 /*:object*/ = {};
const tmpArrElement$9 /*:number*/ = tmpBinLhs$9 - x;
const tmpBinLhs$11 /*:object*/ = {};
const tmpArrElement$11 /*:number*/ = tmpBinLhs$11 << x;
const tmpBinLhs$13 /*:object*/ = {};
const tmpArrElement$13 /*:number*/ = tmpBinLhs$13 >> x;
const tmpBinLhs$15 /*:object*/ = {};
const tmpArrElement$15 /*:number*/ = tmpBinLhs$15 >>> x;
const tmpBinLhs$17 /*:object*/ = {};
const tmpArrElement$17 /*:boolean*/ = tmpBinLhs$17 < x;
const tmpBinLhs$19 /*:object*/ = {};
const tmpArrElement$19 /*:boolean*/ = tmpBinLhs$19 > x;
const tmpBinLhs$21 /*:object*/ = {};
const tmpArrElement$21 /*:boolean*/ = tmpBinLhs$21 <= x;
const tmpBinLhs$23 /*:object*/ = {};
const tmpArrElement$23 /*:boolean*/ = tmpBinLhs$23 >= x;
const tmpBinLhs$25 /*:object*/ = {};
const tmpArrElement$25 /*:boolean*/ = tmpBinLhs$25 == x;
const tmpBinLhs$27 /*:object*/ = {};
const tmpArrElement$27 /*:boolean*/ = tmpBinLhs$27 != x;
const tmpBinLhs$33 /*:object*/ = {};
const tmpArrElement$33 /*:number*/ = tmpBinLhs$33 & x;
const tmpBinLhs$35 /*:object*/ = {};
const tmpArrElement$35 /*:number*/ = tmpBinLhs$35 ^ x;
const tmpBinLhs$37 /*:object*/ = {};
const tmpArrElement$37 /*:number*/ = tmpBinLhs$37 | x;
const tmpBinLhs$29 /*:object*/ = {};
const tmpBinLhs$31 /*:object*/ = {};
const tmpArrElement$29 /*:boolean*/ = tmpBinLhs$29 === x;
const tmpArrElement$31 /*:boolean*/ = tmpBinLhs$31 !== x;
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
const tmpBinLhs$39 /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinLhs$39 in x;
$(tmpCalleeParam);
const tmpBinLhs$41 /*:object*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs$41 instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinLhs = {};
const x = {
  toString() {
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    $(`valueOf`);
    return 100;
  },
};
const tmpArrElement = tmpBinLhs ** x;
const tmpArrElement$1 = {} * x;
const tmpArrElement$3 = {} / x;
const tmpArrElement$5 = {} % x;
const tmpArrElement$7 = {} + x;
const tmpArrElement$9 = {} - x;
const tmpArrElement$11 = {} << x;
const tmpArrElement$13 = {} >> x;
const tmpArrElement$15 = {} >>> x;
const tmpArrElement$17 = {} < x;
const tmpArrElement$19 = {} > x;
const tmpArrElement$21 = {} <= x;
const tmpArrElement$23 = {} >= x;
const tmpArrElement$25 = {} == x;
const tmpArrElement$27 = {} != x;
const tmpArrElement$33 = {} & x;
const tmpArrElement$35 = {} ^ x;
const tmpArrElement$37 = {} | x;
const tmpBinLhs$29 = {};
const tmpBinLhs$31 = {};
const tmpArrElement$29 = tmpBinLhs$29 === x;
const tmpArrElement$31 = tmpBinLhs$31 !== x;
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
$({} in x);
$({} instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {
  toString(  ) {
    debugger;
    const c = $( "toString" );
    return c;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
const d = a ** b;
const e = {};
const f = e * b;
const g = {};
const h = g / b;
const i = {};
const j = i % b;
const k = {};
const l = k + b;
const m = {};
const n = m - b;
const o = {};
const p = o << b;
const q = {};
const r = q >> b;
const s = {};
const t = s >>> b;
const u = {};
const v = u < b;
const w = {};
const x = w > b;
const y = {};
const z = y <= b;
const ba = {};
const bb = ba >= b;
const bc = {};
const bd = bc == b;
const be = {};
const bf = be != b;
const bg = {};
const bh = bg & b;
const bi = {};
const bj = bi ^ b;
const bk = {};
const bl = bk | b;
const bm = {};
const bn = {};
const bo = bm === b;
const bp = bn !== b;
const bq = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, bd, bf, bo, bp, bh, bj, bl ];
$( bq );
const br = {};
const bs = br in b;
$( bs );
const bt = {};
const bu = bt instanceof b;
$( bu );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'valueOf'
 - 2: 'valueOf'
 - 3: 'valueOf'
 - 4: 'valueOf'
 - 5: 'valueOf'
 - 6: 'valueOf'
 - 7: 'valueOf'
 - 8: 'valueOf'
 - 9: 'valueOf'
 - 10: 'valueOf'
 - 11: 'valueOf'
 - 12: 'valueOf'
 - 13: 'valueOf'
 - 14: 'valueOf'
 - 15: 'valueOf'
 - 16: 'valueOf'
 - 17: [NaN, NaN, NaN, NaN, '[object Object]100', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
