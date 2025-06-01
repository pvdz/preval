# Preval test case

# opaque_binary_op.md

> Ai > Ai5 > Opaque binary op
>
> Test that binary operations with opaque values are preserved

## Input

`````js filename=intro
const x = $("test");
const y = $("test");
const z = x + y;
const w = x == y;
const v = x === y;
$(z);
$(w);
$(v);

// Expected: Preval should preserve all binary operations
// as it cannot know what valueOf() or toString() might do
// on opaque values during operations
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:unknown*/ = $(`test`);
const z /*:primitive*/ = x + y;
const w /*:boolean*/ = x == y;
$(z);
$(w);
const v /*:boolean*/ = x === y;
$(v);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = $(`test`);
const z = x + y;
const w = x == y;
$(z);
$(w);
$(x === y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $( "test" );
const c = a + b;
const d = a == b;
$( c );
$( d );
const e = a === b;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = $(`test`);
const z = x + y;
const w = x == y;
const v = x === y;
$(z);
$(w);
$(v);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'test'
 - 3: 'testtest'
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
