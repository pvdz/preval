# Preval test case

# global_group_literal.md

> Normalize > Optional > Global group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
const y = (1, 2, 3)?.foo
$(y);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (3).foo;
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$((3).foo);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 3.foo;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
