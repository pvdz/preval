# Preval test case

# unary_nan.md

> Normalize > Binary > With > Nan > Unary nan
>
> Deal with certain primitive with unary ops

## Input

`````js filename=intro
const arr = [
  ~ NaN,
  ! NaN,
  - NaN,
  + NaN,
  typeof NaN,
  void NaN,
];
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [-1, true, NaN, NaN, `number`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-1, true, NaN, NaN, `number`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ -1, true, NaN, NaN, "number", undefined ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [-1, true, NaN, NaN, 'number', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
