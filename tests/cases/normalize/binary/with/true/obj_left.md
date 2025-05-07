# Preval test case

# obj_left.md

> Normalize > Binary > With > True > Obj left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);
$(x in true);
$(x instanceof true);
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
const tmpArrElement /*:number*/ = x ** 1;
const tmpArrElement$1 /*:number*/ = x * 1;
const tmpArrElement$3 /*:number*/ = x / 1;
const tmpArrElement$5 /*:number*/ = x % 1;
const tmpArrElement$7 /*:primitive*/ = x + true;
const tmpArrElement$9 /*:number*/ = x - 1;
const tmpArrElement$11 /*:number*/ = x << 1;
const tmpArrElement$13 /*:number*/ = x >> 1;
const tmpArrElement$15 /*:number*/ = x >>> 1;
const tmpArrElement$17 /*:boolean*/ = x < true;
const tmpArrElement$19 /*:boolean*/ = x > true;
const tmpArrElement$21 /*:boolean*/ = x <= true;
const tmpArrElement$23 /*:boolean*/ = x >= true;
const tmpArrElement$25 /*:boolean*/ = x == true;
const tmpArrElement$27 /*:boolean*/ = x != true;
const tmpArrElement$33 /*:number*/ = x & 1;
const tmpArrElement$35 /*:number*/ = x ^ 1;
const tmpArrElement$37 /*:number*/ = x | 1;
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
const tmpCalleeParam /*:boolean*/ = x in true;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof true;
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
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
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
$(x in true);
$(x instanceof true);
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
const c = a ** 1;
const d = a * 1;
const e = a / 1;
const f = a % 1;
const g = a + true;
const h = a - 1;
const i = a << 1;
const j = a >> 1;
const k = a >>> 1;
const l = a < true;
const m = a > true;
const n = a <= true;
const o = a >= true;
const p = a == true;
const q = a != true;
const r = a & 1;
const s = a ^ 1;
const t = a | 1;
const u = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, r, s, t ];
$( u );
const v = a in true;
$( v );
const w = a instanceof true;
$( w );
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
 - 19: [100, 100, 100, 0, 101, 99, 200, 50, 50, false, true, false, true, false, true, false, true, 0, 101, 101]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in true ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
