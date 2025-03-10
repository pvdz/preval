# Preval test case

# undefined_shift_obj.md

> Normalize > Binary > With > Undefined > Undefined shift obj
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};
const arr = [
  undefined << x,
  undefined >> x,
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
const tmpArrElement /*:number*/ = 0 << x;
const tmpArrElement$1 /*:number*/ = 0 >> x;
const arr /*:array*/ = [tmpArrElement, tmpArrElement$1];
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
const tmpArrElement = 0 << x;
const tmpArrElement$1 = 0 >> x;
$([tmpArrElement, tmpArrElement$1]);
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
const arr = [undefined << x, undefined >> x];
$(arr);
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
const tmpArrElement = 0 << x;
const tmpArrElement$1 = 0 >> x;
const arr = [tmpArrElement, tmpArrElement$1];
$(arr);
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
const c = 0 << a;
const d = 0 >> a;
const e = [ c, d ];
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'valueOf'
 - 2: 'valueOf'
 - 3: [0, 0]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
