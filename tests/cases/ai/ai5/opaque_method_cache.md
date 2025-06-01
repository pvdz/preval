# Preval test case

# opaque_method_cache.md

> Ai > Ai5 > Opaque method cache
>
> Test caching of method references for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = x.toString();
const z = x.toString();
$(y + z);

// Expected:
// const x = $("test");
// const toString = x.toString;
// const y = $dotCall(toString, x, "toString");
// const z = $dotCall(toString, x, "toString");
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCF /*:unknown*/ = x.toString;
const y /*:unknown*/ = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 /*:unknown*/ = x.toString;
const z /*:unknown*/ = $dotCall(tmpMCF$1, x, `toString`);
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x.toString();
$(y + x.toString());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = a.toString;
const e = $dotCall( d, a, "toString" );
const f = c + e;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpMCF = x.toString;
const y = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 = x.toString;
const z = $dotCall(tmpMCF$1, x, `toString`);
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
 - 2: 'testtest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
