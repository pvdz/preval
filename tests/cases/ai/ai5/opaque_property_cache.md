# Preval test case

# opaque_property_cache.md

> Ai > Ai5 > Opaque property cache
>
> Test caching of property accesses for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = x.length;
const z = x.length;
$(y + z);

// Expected:
// const x = $("test");
// const length = x.length;
// const y = length;
// const z = length;
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:unknown*/ = x.length;
const z /*:unknown*/ = x.length;
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x.length;
$(y + x.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.length;
const c = a.length;
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = x.length;
const z = x.length;
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
 - 2: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
