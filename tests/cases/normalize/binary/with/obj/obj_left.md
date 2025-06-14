# Preval test case

# obj_left.md

> Normalize > Binary > With > Obj > Obj left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** {},
  x * {},
  x / {},
  x % {},
  x + {},
  x - {},
  x << {},
  x >> {},
  x >>> {},
  x < {},
  x > {},
  x <= {},
  x >= {},
  x == {},
  x != {},
  x === {},
  x !== {},
  x & {},
  x ^ {},
  x | {},
];
$(arr);
$(x in {});
$(x instanceof {});
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = {
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
const tmpBinBothRhs /*:object*/ /*truthy*/ = {};
const tmpArrElement /*:number*/ = x ** tmpBinBothRhs;
const tmpBinBothRhs$1 /*:object*/ /*truthy*/ = {};
const tmpArrElement$1 /*:number*/ = x * tmpBinBothRhs$1;
const tmpBinBothRhs$3 /*:object*/ /*truthy*/ = {};
const tmpArrElement$3 /*:number*/ = x / tmpBinBothRhs$3;
const tmpBinBothRhs$5 /*:object*/ /*truthy*/ = {};
const tmpArrElement$5 /*:number*/ = x % tmpBinBothRhs$5;
const tmpBinBothRhs$7 /*:object*/ /*truthy*/ = {};
const tmpArrElement$7 /*:primitive*/ = x + tmpBinBothRhs$7;
const tmpBinBothRhs$9 /*:object*/ /*truthy*/ = {};
const tmpArrElement$9 /*:number*/ = x - tmpBinBothRhs$9;
const tmpBinBothRhs$11 /*:object*/ /*truthy*/ = {};
const tmpArrElement$11 /*:number*/ = x << tmpBinBothRhs$11;
const tmpBinBothRhs$13 /*:object*/ /*truthy*/ = {};
const tmpArrElement$13 /*:number*/ = x >> tmpBinBothRhs$13;
const tmpBinBothRhs$15 /*:object*/ /*truthy*/ = {};
const tmpArrElement$15 /*:number*/ = x >>> tmpBinBothRhs$15;
const tmpBinBothRhs$17 /*:object*/ /*truthy*/ = {};
const tmpArrElement$17 /*:boolean*/ = x < tmpBinBothRhs$17;
const tmpBinBothRhs$19 /*:object*/ /*truthy*/ = {};
const tmpArrElement$19 /*:boolean*/ = x > tmpBinBothRhs$19;
const tmpBinBothRhs$21 /*:object*/ /*truthy*/ = {};
const tmpArrElement$21 /*:boolean*/ = x <= tmpBinBothRhs$21;
const tmpBinBothRhs$23 /*:object*/ /*truthy*/ = {};
const tmpArrElement$23 /*:boolean*/ = x >= tmpBinBothRhs$23;
const tmpBinBothRhs$33 /*:object*/ /*truthy*/ = {};
const tmpArrElement$33 /*:number*/ = x & tmpBinBothRhs$33;
const tmpBinBothRhs$35 /*:object*/ /*truthy*/ = {};
const tmpArrElement$35 /*:number*/ = x ^ tmpBinBothRhs$35;
const tmpBinBothRhs$37 /*:object*/ /*truthy*/ = {};
const tmpArrElement$37 /*:number*/ = x | tmpBinBothRhs$37;
const tmpBinBothRhs$29 /*:object*/ /*truthy*/ = {};
const tmpBinBothRhs$31 /*:object*/ /*truthy*/ = {};
const tmpArrElement$29 /*:boolean*/ = x === tmpBinBothRhs$29;
const tmpArrElement$31 /*:boolean*/ = x !== tmpBinBothRhs$31;
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
  false,
  true,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpBinBothRhs$39 /*:object*/ /*truthy*/ = {};
const tmpCalleeParam /*:boolean*/ = x in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothRhs$41 /*:object*/ /*truthy*/ = {};
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
const tmpArrElement = x ** {};
const tmpArrElement$1 = x * {};
const tmpArrElement$3 = x / {};
const tmpArrElement$5 = x % {};
const tmpArrElement$7 = x + {};
const tmpArrElement$9 = x - {};
const tmpArrElement$11 = x << {};
const tmpArrElement$13 = x >> {};
const tmpArrElement$15 = x >>> {};
const tmpArrElement$17 = x < {};
const tmpArrElement$19 = x > {};
const tmpArrElement$21 = x <= {};
const tmpArrElement$23 = x >= {};
const tmpArrElement$33 = x & {};
const tmpArrElement$35 = x ^ {};
const tmpArrElement$37 = x | {};
const tmpBinBothRhs$29 = {};
const tmpBinBothRhs$31 = {};
const tmpArrElement$29 = x === tmpBinBothRhs$29;
const tmpArrElement$31 = x !== tmpBinBothRhs$31;
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
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in {});
$(x instanceof {});
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
const c = {};
const d = a ** c;
const e = {};
const f = a * e;
const g = {};
const h = a / g;
const i = {};
const j = a % i;
const k = {};
const l = a + k;
const m = {};
const n = a - m;
const o = {};
const p = a << o;
const q = {};
const r = a >> q;
const s = {};
const t = a >>> s;
const u = {};
const v = a < u;
const w = {};
const x = a > w;
const y = {};
const z = a <= y;
const ba = {};
const bb = a >= ba;
const bc = {};
const bd = a & bc;
const be = {};
const bf = a ^ be;
const bg = {};
const bh = a | bg;
const bi = {};
const bj = {};
const bk = a === bi;
const bl = a !== bj;
const bm = [ d, f, h, j, l, n, p, r, t, v, x, z, bb, false, true, bk, bl, bd, bf, bh ];
$( bm );
const bn = {};
const bo = a in bn;
$( bo );
const bp = {};
const bq = a instanceof bp;
$( bq );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = {
  toString() {
    debugger;
    const tmpReturnArg = $(`toString`);
    return tmpReturnArg;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const tmpBinBothLhs = x;
const tmpBinBothRhs = {};
const tmpArrElement = tmpBinBothLhs ** tmpBinBothRhs;
const tmpBinBothLhs$1 = x;
const tmpBinBothRhs$1 = {};
const tmpArrElement$1 = tmpBinBothLhs$1 * tmpBinBothRhs$1;
const tmpBinBothLhs$3 = x;
const tmpBinBothRhs$3 = {};
const tmpArrElement$3 = tmpBinBothLhs$3 / tmpBinBothRhs$3;
const tmpBinBothLhs$5 = x;
const tmpBinBothRhs$5 = {};
const tmpArrElement$5 = tmpBinBothLhs$5 % tmpBinBothRhs$5;
const tmpBinBothLhs$7 = x;
const tmpBinBothRhs$7 = {};
const tmpArrElement$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
const tmpBinBothLhs$9 = x;
const tmpBinBothRhs$9 = {};
const tmpArrElement$9 = tmpBinBothLhs$9 - tmpBinBothRhs$9;
const tmpBinBothLhs$11 = x;
const tmpBinBothRhs$11 = {};
const tmpArrElement$11 = tmpBinBothLhs$11 << tmpBinBothRhs$11;
const tmpBinBothLhs$13 = x;
const tmpBinBothRhs$13 = {};
const tmpArrElement$13 = tmpBinBothLhs$13 >> tmpBinBothRhs$13;
const tmpBinBothLhs$15 = x;
const tmpBinBothRhs$15 = {};
const tmpArrElement$15 = tmpBinBothLhs$15 >>> tmpBinBothRhs$15;
const tmpBinBothLhs$17 = x;
const tmpBinBothRhs$17 = {};
const tmpArrElement$17 = tmpBinBothLhs$17 < tmpBinBothRhs$17;
const tmpBinBothLhs$19 = x;
const tmpBinBothRhs$19 = {};
const tmpArrElement$19 = tmpBinBothLhs$19 > tmpBinBothRhs$19;
const tmpBinBothLhs$21 = x;
const tmpBinBothRhs$21 = {};
const tmpArrElement$21 = tmpBinBothLhs$21 <= tmpBinBothRhs$21;
const tmpBinBothLhs$23 = x;
const tmpBinBothRhs$23 = {};
const tmpArrElement$23 = tmpBinBothLhs$23 >= tmpBinBothRhs$23;
const tmpBinBothLhs$25 = x;
const tmpBinBothRhs$25 = {};
const tmpArrElement$25 = tmpBinBothLhs$25 == tmpBinBothRhs$25;
const tmpBinBothLhs$27 = x;
const tmpBinBothRhs$27 = {};
const tmpArrElement$27 = tmpBinBothLhs$27 != tmpBinBothRhs$27;
const tmpBinBothLhs$29 = x;
const tmpBinBothRhs$29 = {};
const tmpArrElement$29 = tmpBinBothLhs$29 === tmpBinBothRhs$29;
const tmpBinBothLhs$31 = x;
const tmpBinBothRhs$31 = {};
const tmpArrElement$31 = tmpBinBothLhs$31 !== tmpBinBothRhs$31;
const tmpBinBothLhs$33 = x;
const tmpBinBothRhs$33 = {};
const tmpArrElement$33 = tmpBinBothLhs$33 & tmpBinBothRhs$33;
const tmpBinBothLhs$35 = x;
const tmpBinBothRhs$35 = {};
const tmpArrElement$35 = tmpBinBothLhs$35 ^ tmpBinBothRhs$35;
const tmpBinBothLhs$37 = x;
const tmpBinBothRhs$37 = {};
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
const tmpBinBothRhs$39 = {};
let tmpCalleeParam = tmpBinBothLhs$39 in tmpBinBothRhs$39;
$(tmpCalleeParam);
const tmpBinBothLhs$41 = x;
const tmpBinBothRhs$41 = {};
let tmpCalleeParam$1 = tmpBinBothLhs$41 instanceof tmpBinBothRhs$41;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
 - 17: [NaN, NaN, NaN, NaN, '100[object Object]', NaN, 100, 100, 100, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 18: 'toString'
 - 19: true
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
