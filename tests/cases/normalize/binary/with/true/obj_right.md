# Preval test case

# obj_right.md

> Normalize > Binary > With > True > Obj right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  true ** x,
  true * x,
  true / x,
  true % x,
  true + x,
  true - x,
  true << x,
  true >> x,
  true >>> x,
  true < x,
  true > x,
  true <= x,
  true >= x,
  true == x,
  true != x,
  true === x,
  true !== x,
  true & x,
  true ^ x,
  true | x,
];
$(arr);
$(true in x);
$(true instanceof x);
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
const tmpArrElement /*:number*/ = 1 ** x;
const tmpArrElement$1 /*:number*/ = 1 * x;
const tmpArrElement$3 /*:number*/ = 1 / x;
const tmpArrElement$5 /*:number*/ = 1 % x;
const tmpArrElement$7 /*:primitive*/ = true + x;
const tmpArrElement$9 /*:number*/ = 1 - x;
const tmpArrElement$11 /*:number*/ = 1 << x;
const tmpArrElement$13 /*:number*/ = 1 >> x;
const tmpArrElement$15 /*:number*/ = 1 >>> x;
const tmpArrElement$17 /*:boolean*/ = true < x;
const tmpArrElement$19 /*:boolean*/ = true > x;
const tmpArrElement$21 /*:boolean*/ = true <= x;
const tmpArrElement$23 /*:boolean*/ = true >= x;
const tmpArrElement$25 /*:boolean*/ = true == x;
const tmpArrElement$27 /*:boolean*/ = true != x;
const tmpArrElement$33 /*:number*/ = 1 & x;
const tmpArrElement$35 /*:number*/ = 1 ^ x;
const tmpArrElement$37 /*:number*/ = 1 | x;
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = true in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = true instanceof x;
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
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(true in x);
$(true instanceof x);
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
const c = 1 ** a;
const d = 1 * a;
const e = 1 / a;
const f = 1 % a;
const g = true + a;
const h = 1 - a;
const i = 1 << a;
const j = 1 >> a;
const k = 1 >>> a;
const l = true < a;
const m = true > a;
const n = true <= a;
const o = true >= a;
const p = true == a;
const q = true != a;
const r = 1 & a;
const s = 1 ^ a;
const t = 1 | a;
const u = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, r, s, t ];
$( u );
const v = true in a;
$( v );
const w = true instanceof a;
$( w );
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
 - 17: 'valueOf'
 - 18: 'valueOf'
 - 19: [1, 100, 0.01, 1, 101, -99, 16, 0, 0, true, false, true, false, false, true, false, true, 0, 101, 101]
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
