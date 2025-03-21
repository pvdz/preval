# Preval test case

# unary_nan.md

> Normalize > Binary > With > Undefined > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ undefined,
  ! undefined,
  - undefined,
  + undefined,
  typeof undefined,
  void undefined,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, true, NaN, NaN, `undefined`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, true, NaN, NaN, `undefined`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, true, NaN, NaN, "undefined", undefined ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, true, NaN, NaN, 'undefined', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
