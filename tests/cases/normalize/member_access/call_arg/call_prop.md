# Preval test case

# call_prop.md

> Normalize > Member access > Call arg > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$($('foo').length);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:unknown*/ = tmpCompObj.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`foo`).length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = a.length;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
