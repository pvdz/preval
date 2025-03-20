# Preval test case

# group_call.md

> Normalize > Member access > Var init > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
let x = ($(1), $(2), $($)).length;
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
const x /*:unknown*/ = tmpCompObj.length;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($($).length);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
const b = a.length;
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
