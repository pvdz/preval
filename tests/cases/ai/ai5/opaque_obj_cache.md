# Preval test case

# opaque_obj_cache.md

> Ai > Ai5 > Opaque obj cache
>
> Test caching of object operations for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = { ...x, a: 1 };
const z = { ...x, b: 2 };
$(y + z);

// Expected:
// const x = $("test");
// const spread = { ...x };
// const y = { ...spread, a: 1 };
// const z = { ...spread, b: 2 };
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:object*/ /*truthy*/ = { ...x, a: 1 };
const z /*:object*/ /*truthy*/ = { ...x, b: 2 };
const tmpCalleeParam /*:primitive*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = { ...x, a: 1 };
$(y + { ...x, b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = {
  ... a,
  a: 1,
};
const c = {
  ... a,
  b: 2,
};
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const y = { ...x, a: 1 };
const z = { ...x, b: 2 };
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
 - 2: '[object Object][object Object]'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
