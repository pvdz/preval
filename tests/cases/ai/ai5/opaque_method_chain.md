# Preval test case

# opaque_method_chain.md

> Ai > Ai5 > Opaque method chain
>
> Test preservation of opaque value method call chains

## Input

`````js filename=intro
const x = $("test");
const y = x.toString().trim().toLowerCase();
$(y);

// Expected:
// const x = $("test");
// const tmp = x.toString();
// const y = tmp.trim().toLowerCase();
// $(y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCF /*:unknown*/ = x.toString;
const tmpMCOO$1 /*:unknown*/ = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.trim;
const tmpMCOO /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `trim`);
const tmpMCF$3 /*:unknown*/ = tmpMCOO.toLowerCase;
const y /*:unknown*/ = $dotCall(tmpMCF$3, tmpMCOO, `toLowerCase`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpMCOO$1 = x.toString();
const tmpMCOO = tmpMCOO$1.trim();
$(tmpMCOO.toLowerCase());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = c.trim;
const e = $dotCall( d, c, "trim" );
const f = e.toLowerCase;
const g = $dotCall( f, e, "toLowerCase" );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpMCF = x.toString;
const tmpMCOO$1 = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 = tmpMCOO$1.trim;
const tmpMCOO = $dotCall(tmpMCF$1, tmpMCOO$1, `trim`);
const tmpMCF$3 = tmpMCOO.toLowerCase;
const y = $dotCall(tmpMCF$3, tmpMCOO, `toLowerCase`);
$(y);
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
