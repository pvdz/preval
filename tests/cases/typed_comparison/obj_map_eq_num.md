# Preval test case

# obj_map_eq_num.md

> Typed comparison > Obj map eq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = new Map;
const y = x === false;
$('out:', y);
`````


## Settled


`````js filename=intro
$(`out:`, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "out:", false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $map_constructor();
const y = x === false;
$(`out:`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
