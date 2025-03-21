# Preval test case

# call_prop.md

> Normalize > Member access > Statement > Global > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$('foo').length;
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(`foo`);
tmpCompObj.length;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`).length;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
a.length;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
