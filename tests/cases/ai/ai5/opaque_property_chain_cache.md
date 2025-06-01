# Preval test case

# opaque_property_chain_cache.md

> Ai > Ai5 > Opaque property chain cache
>
> Test caching of property chain prefixes for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = x.prop.subprop;
const z = x.prop.other;
$(y + z);

// Expected:
// const x = $("test");
// const prop = x.prop;
// const y = prop.subprop;
// const z = prop.other;
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpCompObj /*:unknown*/ = x.prop;
const y /*:unknown*/ = tmpCompObj.subprop;
const tmpCompObj$1 /*:unknown*/ = x.prop;
const z /*:unknown*/ = tmpCompObj$1.other;
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x.prop.subprop;
$(y + x.prop.other);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.prop;
const c = b.subprop;
const d = a.prop;
const e = d.other;
const f = c + e;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpCompObj = x.prop;
const y = tmpCompObj.subprop;
const tmpCompObj$1 = x.prop;
const z = tmpCompObj$1.other;
let tmpCalleeParam = y + z;
$(tmpCalleeParam);
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
