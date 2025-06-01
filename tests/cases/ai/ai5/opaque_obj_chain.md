# Preval test case

# opaque_obj_chain.md

> Ai > Ai5 > Opaque obj chain
>
> Test optimization of opaque value object property chains

## Input

`````js filename=intro
const x = $("test");
const y = { prop: x };
const z = { subprop: y };
$(z.subprop.prop);

// Expected:
// const x = $("test");
// const z = { subprop: { prop: x } };
// $(z.subprop.prop);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`test`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = { prop: x };
const z = { subprop: y };
const tmpCompObj = z.subprop;
let tmpCalleeParam = tmpCompObj.prop;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
