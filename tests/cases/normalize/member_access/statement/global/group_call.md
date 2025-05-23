# Preval test case

# group_call.md

> Normalize > Member access > Statement > Global > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
($(1), $(2), $($)).length;
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
tmpCompObj.length;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($).length;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
a.length;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
tmpCompObj.length;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
