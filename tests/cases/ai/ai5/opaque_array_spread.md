# Preval test case

# opaque_array_spread.md

> Ai > Ai5 > Opaque array spread
>
> Test preservation of opaque value array spread operations

## Input

`````js filename=intro
const x = $("test");
const arr = [...x, ...x];
$(arr);

// Expected:
// const x = $("test");
// const tmp = [...x];
// const arr = [...tmp, ...tmp];
// $(arr);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const arr /*:array*/ /*truthy*/ = [...x, ...x];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
$([...x, ...x]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = [ ...a, ...a ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const arr = [...x, ...x];
$(arr);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: ['t', 'e', 's', 't', 't', 'e', 's', 't']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
