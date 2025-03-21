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
const arr /*:array*/ = [false, true, false, true];
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


## Todos triggered


None


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
