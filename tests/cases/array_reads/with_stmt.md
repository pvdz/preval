# Preval test case

# with_stmt.md

> Array reads > With stmt
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
$('distraction');
$(arr[0]);
`````


## Settled


`````js filename=intro
$(`distraction`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`distraction`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "distraction" );
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'distraction'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
