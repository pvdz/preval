# Preval test case

# obj_left.md

> Normalize > Binary > With > Infinity > Obj left
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
  x ** Infinity,
  x * Infinity,
  x / Infinity,
  x % Infinity,
  x + Infinity,
  x - Infinity,
  x << Infinity,
  x >> Infinity,
  x >>> Infinity,
  x < Infinity,
  x > Infinity,
  x <= Infinity,
  x >= Infinity,
  x == Infinity,
  x != Infinity,
  x === Infinity,
  x !== Infinity,
  x & Infinity,
  x ^ Infinity,
  x | Infinity,
];
$(arr);
$(x in Infinity);
$(x instanceof Infinity);
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
const tmpArrElement /*:number*/ = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 /*:number*/ = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 /*:number*/ = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 /*:number*/ = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 /*:primitive*/ = x + $Number_POSITIVE_INFINITY;
const tmpArrElement$9 /*:number*/ = x - $Number_POSITIVE_INFINITY;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < $Number_POSITIVE_INFINITY;
const tmpArrElement$19 /*:boolean*/ = x > $Number_POSITIVE_INFINITY;
const tmpArrElement$21 /*:boolean*/ = x <= $Number_POSITIVE_INFINITY;
const tmpArrElement$23 /*:boolean*/ = x >= $Number_POSITIVE_INFINITY;
const tmpArrElement$25 /*:boolean*/ = x == $Number_POSITIVE_INFINITY;
const tmpArrElement$27 /*:boolean*/ = x != $Number_POSITIVE_INFINITY;
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
const tmpCalleeParam /*:boolean*/ = x in $Number_POSITIVE_INFINITY;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof $Number_POSITIVE_INFINITY;
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
const tmpArrElement = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 = x + $Number_POSITIVE_INFINITY;
const tmpArrElement$9 = x - $Number_POSITIVE_INFINITY;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < $Number_POSITIVE_INFINITY;
const tmpArrElement$19 = x > $Number_POSITIVE_INFINITY;
const tmpArrElement$21 = x <= $Number_POSITIVE_INFINITY;
const tmpArrElement$23 = x >= $Number_POSITIVE_INFINITY;
const tmpArrElement$25 = x == $Number_POSITIVE_INFINITY;
const tmpArrElement$27 = x != $Number_POSITIVE_INFINITY;
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
$(x in $Number_POSITIVE_INFINITY);
$(x instanceof $Number_POSITIVE_INFINITY);
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
const c = a ** $Number_POSITIVE_INFINITY;
const d = a * $Number_POSITIVE_INFINITY;
const e = a / $Number_POSITIVE_INFINITY;
const f = a % $Number_POSITIVE_INFINITY;
const g = a + $Number_POSITIVE_INFINITY;
const h = a - $Number_POSITIVE_INFINITY;
const i = a << 0;
const j = a >> 0;
const k = a >>> 0;
const l = a < $Number_POSITIVE_INFINITY;
const m = a > $Number_POSITIVE_INFINITY;
const n = a <= $Number_POSITIVE_INFINITY;
const o = a >= $Number_POSITIVE_INFINITY;
const p = a == $Number_POSITIVE_INFINITY;
const q = a != $Number_POSITIVE_INFINITY;
a ** 0;
const r = a ^ 0;
const s = a | 0;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = a in $Number_POSITIVE_INFINITY;
$( u );
const v = a instanceof $Number_POSITIVE_INFINITY;
$( v );
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
const tmpArrElement = x ** Infinity;
const tmpArrElement$1 = x * Infinity;
const tmpArrElement$3 = x / Infinity;
const tmpArrElement$5 = x % Infinity;
const tmpArrElement$7 = x + Infinity;
const tmpArrElement$9 = x - Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < Infinity;
const tmpArrElement$19 = x > Infinity;
const tmpArrElement$21 = x <= Infinity;
const tmpArrElement$23 = x >= Infinity;
const tmpArrElement$25 = x == Infinity;
const tmpArrElement$27 = x != Infinity;
const tmpArrElement$29 = x === Infinity;
const tmpArrElement$31 = x !== Infinity;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
let tmpCalleeParam = x in Infinity;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof Infinity;
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
 - 17: 'valueOf'
 - 18: 'valueOf'
 - 19: [Infinity, Infinity, 0, 100, Infinity, -Infinity, 100, 100, 100, true, false, true, false, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
