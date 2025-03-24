# obj_left

# x_op_nan.md

> Normalize > Binary > With > Regex > X op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** /foo/g,
  x * /foo/g,
  x / /foo/g,
  x % /foo/g,
  x + /foo/g,
  x - /foo/g,
  x << /foo/g,
  x >> /foo/g,
  x >>> /foo/g,
  x < /foo/g,
  x > /foo/g,
  x <= /foo/g,
  x >= /foo/g,
  x == /foo/g,
  x != /foo/g,
  x === /foo/g,
  x !== /foo/g,
  x & /foo/g,
  x ^ /foo/g,
  x | /foo/g,
];
$(arr);
$(x in /foo/g);
$(x instanceof /foo/g);
`````


## Settled


`````js filename=intro
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
const tmpBinBothRhs /*:regex*/ = /foo/g;
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 /*:regex*/ = /foo/g;
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:regex*/ = /foo/g;
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:regex*/ = /foo/g;
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:regex*/ = /foo/g;
const tmpArrElement$7 /*:primitive*/ = x + tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:regex*/ = /foo/g;
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:regex*/ = /foo/g;
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:regex*/ = /foo/g;
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:regex*/ = /foo/g;
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:regex*/ = /foo/g;
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:regex*/ = /foo/g;
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:regex*/ = /foo/g;
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:regex*/ = /foo/g;
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$33 /*:regex*/ = /foo/g;
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 /*:regex*/ = /foo/g;
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:regex*/ = /foo/g;
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$37;
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
  false,
  true,
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothRhs$39 /*:regex*/ = /foo/g;
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothRhs$41 /*:regex*/ = /foo/g;
const tmpCalleeParam$1 /*:boolean*/ = x instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
const tmpArrElement = x ** /foo/g;
const tmpArrElement$1 = x * /foo/g;
const tmpArrElement$3 = x / /foo/g;
const tmpArrElement$5 = x % /foo/g;
const tmpArrElement$7 = x + /foo/g;
const tmpArrElement$9 = x - /foo/g;
const tmpArrElement$11 = x << /foo/g;
const tmpArrElement$13 = x >> /foo/g;
const tmpArrElement$15 = x >>> /foo/g;
const tmpArrElement$17 = x < /foo/g;
const tmpArrElement$19 = x > /foo/g;
const tmpArrElement$21 = x <= /foo/g;
const tmpArrElement$23 = x >= /foo/g;
const tmpArrElement$33 = x & /foo/g;
const tmpArrElement$35 = x ^ /foo/g;
const tmpArrElement$37 = x | /foo/g;
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
  false,
  true,
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in /foo/g);
$(x instanceof /foo/g);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    const b = $( "toString" );
    return b;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return 100;
  },
};
const c = /foo/g;
const d = a ** c;
const e = /foo/g;
const f = a * e;
const g = /foo/g;
const h = a / g;
const i = /foo/g;
const j = a % i;
const k = /foo/g;
const l = a + k;
const m = /foo/g;
const n = a - m;
const o = /foo/g;
const p = a << o;
const q = /foo/g;
const r = a >> q;
const s = /foo/g;
const t = a >>> s;
const u = /foo/g;
const v = a < u;
const w = /foo/g;
const x = a > w;
const y = /foo/g;
const z = a <= y;
const ba = /foo/g;
const bb = a >= ba;
const bc = /foo/g;
const bd = a & bc;
const be = /foo/g;
const bf = a ^ be;
const bg = /foo/g;
const bh = a | bg;
const bi = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, false, true, false, true, bd, bf, bh ];
$( bi );
const bj = /foo/g;
const bk = a in bj;
$( bk );
const bl = /foo/g;
const bm = a instanceof bl;
$( bm );
`````


## Todos triggered


None


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
 - 17: [NaN, NaN, NaN, NaN, '100/foo/g', NaN, 100, 100, 100, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: 'toString'
 - 19: true
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
