# Preval test case

# obj_right.md

> Normalize > Binary > With > False > Obj right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);
$(false in x);
$(false instanceof x);
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
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:primitive*/ = false + x;
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = 0 < x;
const tmpArrElement$19 /*:boolean*/ = 0 > x;
const tmpArrElement$21 /*:boolean*/ = 0 <= x;
const tmpArrElement$23 /*:boolean*/ = 0 >= x;
const tmpArrElement$25 /*:boolean*/ = false == x;
const tmpArrElement$27 /*:boolean*/ = false != x;
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
const tmpCalleeParam /*:boolean*/ = false in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = false instanceof x;
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
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = 0 < x;
const tmpArrElement$19 = 0 > x;
const tmpArrElement$21 = 0 <= x;
const tmpArrElement$23 = 0 >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
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
$(false in x);
$(false instanceof x);
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
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);
$(false in x);
$(false instanceof x);
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
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = 0 < x;
const tmpArrElement$19 = 0 > x;
const tmpArrElement$21 = 0 <= x;
const tmpArrElement$23 = 0 >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
const tmpArrElement$29 = false === x;
const tmpArrElement$31 = false !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
const tmpCalleeParam = false in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = false instanceof x;
$(tmpCalleeParam$1);
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
const c = 0 ** a;
const d = 0 * a;
const e = 0 / a;
const f = 0 % a;
const g = false + a;
const h = 0 - a;
const i = 0 << a;
const j = 0 >> a;
const k = 0 >>> a;
const l = 0 < a;
const m = 0 > a;
const n = 0 <= a;
const o = 0 >= a;
const p = false == a;
const q = false != a;
a ** 0;
const r = 0 ^ a;
const s = 0 | a;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = false in a;
$( u );
const v = false instanceof a;
$( v );
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
 - 19: [0, 0, 0, 0, 100, -100, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 100, 100]
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
