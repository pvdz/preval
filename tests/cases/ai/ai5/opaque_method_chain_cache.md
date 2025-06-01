# Preval test case

# opaque_method_chain_cache.md

> Ai > Ai5 > Opaque method chain cache
>
> Test caching of method chain prefixes for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = x.toString().trim();
const z = x.toString().toLowerCase();
$(y + z);

// Expected:
// const x = $("test");
// const toString = x.toString;
// const str = $dotCall(toString, x, "toString");
// const y = $dotCall(str.trim, str, "trim");
// const z = $dotCall(str.toLowerCase, str, "toLowerCase");
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCF /*:unknown*/ = x.toString;
const tmpMCOO /*:unknown*/ = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 /*:unknown*/ = tmpMCOO.trim;
const y /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO, `trim`);
const tmpMCF$3 /*:unknown*/ = x.toString;
const tmpMCOO$1 /*:unknown*/ = $dotCall(tmpMCF$3, x, `toString`);
const tmpMCF$5 /*:unknown*/ = tmpMCOO$1.toLowerCase;
const z /*:unknown*/ = $dotCall(tmpMCF$5, tmpMCOO$1, `toLowerCase`);
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpMCOO = x.toString();
const y = tmpMCOO.trim();
const tmpMCOO$1 = x.toString();
$(y + tmpMCOO$1.toLowerCase());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = c.trim;
const e = $dotCall( d, c, "trim" );
const f = a.toString;
const g = $dotCall( f, a, "toString" );
const h = g.toLowerCase;
const i = $dotCall( h, g, "toLowerCase" );
const j = e + i;
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpMCF = x.toString;
const tmpMCOO = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 = tmpMCOO.trim;
const y = $dotCall(tmpMCF$1, tmpMCOO, `trim`);
const tmpMCF$3 = x.toString;
const tmpMCOO$1 = $dotCall(tmpMCF$3, x, `toString`);
const tmpMCF$5 = tmpMCOO$1.toLowerCase;
const z = $dotCall(tmpMCF$5, tmpMCOO$1, `toLowerCase`);
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
