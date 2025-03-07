# Preval test case

# x_op_nan.md

> Normalize > Binary > With > Neg infinity > X op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** -Infinity,
  x * -Infinity,
  x / -Infinity,
  x % -Infinity,
  x + -Infinity,
  x - -Infinity,
  x << -Infinity,
  x >> -Infinity,
  x >>> -Infinity,
  x < -Infinity,
  x > -Infinity,
  x <= -Infinity,
  x >= -Infinity,
  x == -Infinity,
  x != -Infinity,
  x === -Infinity,
  x !== -Infinity,
  x & -Infinity,
  x ^ -Infinity,
  x | -Infinity,
];
$(arr);

const arr2 = [
  x in -Infinity,
  x instanceof -Infinity,
];
$(arr2);
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
const tmpArrElement /*:number*/ = x ** -Infinity;
const tmpArrElement$1 /*:number*/ = x * -Infinity;
const tmpArrElement$3 /*:number*/ = x / -Infinity;
const tmpArrElement$5 /*:number*/ = x % -Infinity;
const tmpArrElement$7 /*:primitive*/ = x + -Infinity;
const tmpArrElement$9 /*:number*/ = x - -Infinity;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < -Infinity;
const tmpArrElement$19 /*:boolean*/ = x > -Infinity;
const tmpArrElement$21 /*:boolean*/ = x <= -Infinity;
const tmpArrElement$23 /*:boolean*/ = x >= -Infinity;
const tmpArrElement$25 /*:boolean*/ = x == -Infinity;
const tmpArrElement$27 /*:boolean*/ = x != -Infinity;
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
const tmpArrElement$39 /*:boolean*/ = x in -Infinity;
const tmpArrElement$41 /*:boolean*/ = x instanceof -Infinity;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
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
const tmpArrElement = x ** -Infinity;
const tmpArrElement$1 = x * -Infinity;
const tmpArrElement$3 = x / -Infinity;
const tmpArrElement$5 = x % -Infinity;
const tmpArrElement$7 = x + -Infinity;
const tmpArrElement$9 = x - -Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < -Infinity;
const tmpArrElement$19 = x > -Infinity;
const tmpArrElement$21 = x <= -Infinity;
const tmpArrElement$23 = x >= -Infinity;
const tmpArrElement$25 = x == -Infinity;
const tmpArrElement$27 = x != -Infinity;
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
const tmpArrElement$39 = x in -Infinity;
const tmpArrElement$41 = x instanceof -Infinity;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const x = {
  toString() {
    debugger;
    return $(`toString`);
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return 100;
  },
};
const arr = [
  x ** -Infinity,
  x * -Infinity,
  x / -Infinity,
  x % -Infinity,
  x + -Infinity,
  x - -Infinity,
  x << -Infinity,
  x >> -Infinity,
  x >>> -Infinity,
  x < -Infinity,
  x > -Infinity,
  x <= -Infinity,
  x >= -Infinity,
  x == -Infinity,
  x != -Infinity,
  x === -Infinity,
  x !== -Infinity,
  x & -Infinity,
  x ^ -Infinity,
  x | -Infinity,
];
$(arr);
const arr2 = [x in -Infinity, x instanceof -Infinity];
$(arr2);
`````

## Normalized


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
const tmpArrElement = x ** -Infinity;
const tmpArrElement$1 = x * -Infinity;
const tmpArrElement$3 = x / -Infinity;
const tmpArrElement$5 = x % -Infinity;
const tmpArrElement$7 = x + -Infinity;
const tmpArrElement$9 = x - -Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < -Infinity;
const tmpArrElement$19 = x > -Infinity;
const tmpArrElement$21 = x <= -Infinity;
const tmpArrElement$23 = x >= -Infinity;
const tmpArrElement$25 = x == -Infinity;
const tmpArrElement$27 = x != -Infinity;
const tmpArrElement$29 = x === -Infinity;
const tmpArrElement$31 = x !== -Infinity;
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
const tmpArrElement$39 = x in -Infinity;
const tmpArrElement$41 = x instanceof -Infinity;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
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
const c = a ** -Infinity;
const d = a * -Infinity;
const e = a / -Infinity;
const f = a % -Infinity;
const g = a + -Infinity;
const h = a - -Infinity;
const i = a << 0;
const j = a >> 0;
const k = a >>> 0;
const l = a < -Infinity;
const m = a > -Infinity;
const n = a <= -Infinity;
const o = a >= -Infinity;
const p = a == -Infinity;
const q = a != -Infinity;
a ** 0;
const r = a ^ 0;
const s = a | 0;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = a in -Infinity;
const v = a instanceof -Infinity;
const w = [ u, v ];
$( w );
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
 - 17: 'valueOf'
 - 18: 'valueOf'
 - 19: [0, -Infinity, 0, 100, -Infinity, Infinity, 100, 100, 100, false, true, false, true, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in -Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
