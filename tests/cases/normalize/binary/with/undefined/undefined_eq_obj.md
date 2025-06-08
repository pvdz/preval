# Preval test case

# undefined_eq_obj.md

> Normalize > Binary > With > Undefined > Undefined eq obj
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = {
  toString(){ return $('toString'); },
  valueOf(){ $('valueOf'); return 100; },
};
const arr = [
  undefined == x,
  undefined != x,
  undefined === x,
  undefined !== x,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [false, true, false, true];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([false, true, false, true]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ false, true, false, true ];
$( a );
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
const tmpArrElement = undefined == x;
const tmpArrElement$1 = undefined != x;
const tmpArrElement$3 = undefined === x;
const tmpArrElement$5 = undefined !== x;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [false, true, false, true]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
