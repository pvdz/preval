# Preval test case

# opaque_binary_chain.md

> Ai > Ai5 > Opaque binary chain
>
> Test preservation of opaque value binary operation chains

## Input

`````js filename=intro
const x = $("test");
const y = x + x + x;
$(y);

// Expected:
// const x = $("test");
// const tmp = x + x;
// const y = tmp + x;
// $(y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpBinLhs /*:primitive*/ = x + x;
const y /*:primitive*/ = tmpBinLhs + x;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
$(x + x + x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a + a;
const c = b + a;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpBinLhs = x + x;
const y = tmpBinLhs + x;
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'testtesttest'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
