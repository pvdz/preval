# Preval test case

# minus_minus_builtin.md

> Constants > Minus minus builtin
>
> Double negative is positive. These should be statically resolved for builtins.

## Input

`````js filename=intro
const x = -(-(Infinity));
const y = x;
$(y); // Should be inlined to -5
`````


## Settled


`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_POSITIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $Number_POSITIVE_INFINITY;
const y = x;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
