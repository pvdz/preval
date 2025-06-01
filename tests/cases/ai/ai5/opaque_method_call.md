# Preval test case

# opaque_method_call.md

> Ai > Ai5 > Opaque method call
>
> Test that method calls on opaque values are preserved

## Input

`````js filename=intro
const x = $("test");
const y = x.toString();
const z = x.valueOf();
$(y);
$(z);

// Expected: Preval should preserve both method calls
// as it cannot know what toString() or valueOf() might do
// on an opaque value
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCF /*:unknown*/ = x.toString;
const y /*:unknown*/ = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 /*:unknown*/ = x.valueOf;
const z /*:unknown*/ = $dotCall(tmpMCF$1, x, `valueOf`);
$(y);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x.toString();
const z = x.valueOf();
$(y);
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
const d = a.valueOf;
const e = $dotCall( d, a, "valueOf" );
$( c );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpMCF = x.toString;
const y = $dotCall(tmpMCF, x, `toString`);
const tmpMCF$1 = x.valueOf;
const z = $dotCall(tmpMCF$1, x, `valueOf`);
$(y);
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - 3: 'test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
