# Preval test case

# call_prop.md

> Normalize > Member access > Var init > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = $('foo').length;
$(x);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(`foo`);
const x /*:unknown*/ = tmpCompObj.length;
$(x);
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
