# Preval test case

# group_ident.md

> Normalize > Member access > Call arg > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
$(($(1), $).length);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($.length);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $.length;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpCompObj = $;
let tmpCalleeParam = tmpCompObj.length;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
