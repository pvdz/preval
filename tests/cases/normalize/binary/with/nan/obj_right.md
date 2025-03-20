# Preval test case

# obj_right.md

> Normalize > Binary > With > Nan > Obj right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  NaN ** x,
  NaN * x,
  NaN / x,
  NaN % x,
  NaN + x,
  NaN - x,
  NaN << x,
  NaN >> x,
  NaN >>> x,
  NaN < x,
  NaN > x,
  NaN <= x,
  NaN >= x,
  NaN == x,
  NaN != x,
  NaN === x,
  NaN !== x,
  NaN & x,
  NaN ^ x,
  NaN | x,
];
$(arr);
$(NaN in x);
$(NaN instanceof x);
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
const tmpArrElement /*:number*/ = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = NaN + x;
x ** 0;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
  tmpArrElement,
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
const tmpCalleeParam /*:boolean*/ = NaN in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = NaN instanceof x;
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
const tmpArrElement = NaN ** x;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = NaN + x;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
$([
  tmpArrElement,
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
$(NaN in x);
$(NaN instanceof x);
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
const c = NaN ** a;
a ** 0;
a ** 0;
a ** 0;
const d = NaN + a;
a ** 0;
const e = 0 << a;
const f = 0 >> a;
const g = 0 >>> a;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
a ** 0;
const h = 0 ^ a;
const i = 0 | a;
const j = [ c, NaN, NaN, NaN, d, NaN, e, f, g, false, false, false, false, false, true, false, true, 0, h, i ];
$( j );
const k = NaN in a;
$( k );
const l = NaN instanceof a;
$( l );
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
 - 19: [NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 100, 100]
 - 20: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
