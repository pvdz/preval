# Preval test case

# group_literal.md

> Normalize > Member access > Var init > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
let x = ($(1), 2).foo;
$(x);
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = (2).foo;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$((2).foo);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = 2.foo;
$( a );
`````


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
