# Preval test case

# obj_left.md

> Normalize > Binary > With > Undefined > Obj left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x ** undefined,
  x * undefined,
  x / undefined,
  x % undefined,
  x + undefined,
  x - undefined,
  x << undefined,
  x >> undefined,
  x >>> undefined,
  x < undefined,
  x > undefined,
  x <= undefined,
  x >= undefined,
  x == undefined,
  x != undefined,
  x === undefined,
  x !== undefined,
  x & undefined,
  x ^ undefined,
  x | undefined,
];
$(arr);
$(x in undefined);
$(x instanceof undefined);
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = x + undefined;
x ** 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
x ** 0;
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
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = x in undefined;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof undefined;
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
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = x + undefined;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
$coerce(x, `number`);
x ** 0;
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
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in undefined);
$(x instanceof undefined);
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
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const c = a + undefined;
a ** 0;
const d = a << 0;
const e = a >> 0;
const f = a >>> 0;
$coerce( a, "number" );
$coerce( a, "number" );
$coerce( a, "number" );
$coerce( a, "number" );
a ** 0;
const g = a ^ 0;
const h = a | 0;
const i = [ NaN, NaN, NaN, NaN, c, NaN, d, e, f, false, false, false, false, false, true, false, true, 0, g, h ];
$( i );
const j = a in undefined;
$( j );
const k = a instanceof undefined;
$( k );
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
 - 17: [NaN, NaN, NaN, NaN, NaN, NaN, 100, 100, 100, false, false, false, false, false, true, false, true, 0, 100, 100]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in undefined ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
