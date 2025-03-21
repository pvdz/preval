# Preval test case

# ident_logic_and_simple_simple2.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && 2) + `after`);
$(a);
`````


## Settled


`````js filename=intro
$(`2after`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`2after`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "2after" );
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '2after'
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
