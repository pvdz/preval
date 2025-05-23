# Preval test case

# group_ident.md

> Normalize > Member access > Statement > Global > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
($(1), $).length;
`````


## Settled


`````js filename=intro
$(1);
$.length;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$.length;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$.length;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpCompObj = $;
tmpCompObj.length;
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
