# Preval test case

# obj_right.md

> Normalize > Binary > With > Infinity > Obj right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);
$(Infinity in x);
$(Infinity instanceof x);
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
const tmpArrElement /*:number*/ = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 /*:number*/ = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 /*:number*/ = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 /*:number*/ = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 /*:primitive*/ = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 /*:number*/ = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 /*:boolean*/ = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 /*:boolean*/ = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 /*:boolean*/ = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 /*:boolean*/ = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 /*:boolean*/ = $Number_POSITIVE_INFINITY != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
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
const tmpCalleeParam /*:boolean*/ = $Number_POSITIVE_INFINITY in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_POSITIVE_INFINITY instanceof x;
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
const tmpArrElement = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 = $Number_POSITIVE_INFINITY != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
$($Number_POSITIVE_INFINITY in x);
$($Number_POSITIVE_INFINITY instanceof x);
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
const c = $Number_POSITIVE_INFINITY ** a;
const d = $Number_POSITIVE_INFINITY * a;
const e = $Number_POSITIVE_INFINITY / a;
const f = $Number_POSITIVE_INFINITY % a;
const g = $Number_POSITIVE_INFINITY + a;
const h = $Number_POSITIVE_INFINITY - a;
const i = 0 << a;
const j = 0 >> a;
const k = 0 >>> a;
const l = $Number_POSITIVE_INFINITY < a;
const m = $Number_POSITIVE_INFINITY > a;
const n = $Number_POSITIVE_INFINITY <= a;
const o = $Number_POSITIVE_INFINITY >= a;
const p = $Number_POSITIVE_INFINITY == a;
const q = $Number_POSITIVE_INFINITY != a;
a ** 0;
const r = 0 ^ a;
const s = 0 | a;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = $Number_POSITIVE_INFINITY in a;
$( u );
const v = $Number_POSITIVE_INFINITY instanceof a;
$( v );
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
 - 17: 'valueOf'
 - 18: 'valueOf'
 - 19: [Infinity, Infinity, Infinity, NaN, Infinity, Infinity, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 100, 100]
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
