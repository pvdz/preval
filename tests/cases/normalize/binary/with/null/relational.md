# Preval test case

# relational.md

> Normalize > Binary > With > Null > Relational
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};

const arr = [
  x < null,
  x > null,
  null < x,
  null > x,
];
$(arr);
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
const tmpArrElement /*:boolean*/ = x < 0;
const tmpArrElement$1 /*:boolean*/ = x > 0;
const tmpArrElement$3 /*:boolean*/ = 0 < x;
const tmpArrElement$5 /*:boolean*/ = 0 > x;
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5];
$(arr);
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
const tmpArrElement = x < 0;
const tmpArrElement$1 = x > 0;
const tmpArrElement$3 = 0 < x;
const tmpArrElement$5 = 0 > x;
$([tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5]);
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
const c = a < 0;
const d = a > 0;
const e = 0 < a;
const f = 0 > a;
const g = [ c, d, e, f ];
$( g );
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
const tmpArrElement = x < 0;
const tmpArrElement$1 = x > 0;
const tmpArrElement$3 = 0 < x;
const tmpArrElement$5 = 0 > x;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5];
$(arr);
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
 - 5: [false, true, true, false]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
