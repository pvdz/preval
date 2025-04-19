# Preval test case

# group_literal.md

> Normalize > Member access > Assign rhs > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
let x = 10;
x = ($(1), 2).foo;
$(x);
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $Number_prototype.foo;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($Number_prototype.foo);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $Number_prototype.foo;
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
