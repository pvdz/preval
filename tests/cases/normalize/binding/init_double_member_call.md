# Preval test case

# init_double_member_call.md

> Normalize > Binding > Init double member call
>
> Binding declaration with a long init should be outlined

## Input

`````js filename=intro
let x = "foo".length.toString();
$(x);
`````


## Settled


`````js filename=intro
$(`3`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`3`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "3" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
