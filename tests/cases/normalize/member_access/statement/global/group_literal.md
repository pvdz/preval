# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Global > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
($(1), 2).foo;
`````


## Settled


`````js filename=intro
$(1);
$Number_prototype.foo;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$Number_prototype.foo;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$Number_prototype.foo;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpCompObj = 2;
tmpCompObj.foo;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
