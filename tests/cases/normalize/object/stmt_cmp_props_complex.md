# Preval test case

# stmt_cmp_props_complex.md

> Normalize > Object > Stmt cmp props complex
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({[$('x')]: 1, y: $(2)});
`````


## Settled


`````js filename=intro
$(`x`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x" );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`x`);
$(2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
