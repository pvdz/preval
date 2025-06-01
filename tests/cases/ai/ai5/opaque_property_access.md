# Preval test case

# opaque_property_access.md

> Ai > Ai5 > Opaque property access
>
> Test that property access on opaque values is preserved

## Input

`````js filename=intro
const x = $("test");
const y = x.length;
const z = x["custom"];
$(y);
$(z);

// Expected: Preval should preserve both property accesses
// as it cannot know what properties might exist on an opaque value
// or what getters might be triggered
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:unknown*/ = x.length;
const z /*:unknown*/ = x.custom;
$(y);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = x.length;
const z = x.custom;
$(y);
$(z);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = a.length;
const c = a.custom;
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = x.length;
const z = x.custom;
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
 - 2: 4
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
