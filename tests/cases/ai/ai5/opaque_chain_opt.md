# Preval test case

# opaque_chain_opt.md

> Ai > Ai5 > Opaque chain opt
>
> Test optimization of opaque value property access chains

## Input

`````js filename=intro
const x = $("test");
const y = x.prop;
const z = y.subprop;
$(z);

// Expected:
// const x = $("test");
// $(x.prop.subprop);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:unknown*/ = x.prop;
const z /*:unknown*/ = y.subprop;
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`test`).prop.subprop);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.prop;
const c = b.subprop;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = x.prop;
const z = y.subprop;
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
