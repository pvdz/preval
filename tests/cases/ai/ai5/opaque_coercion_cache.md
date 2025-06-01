# Preval test case

# opaque_coercion_cache.md

> Ai > Ai5 > Opaque coercion cache
>
> Test caching of type coercions for opaque values

## Input

`````js filename=intro
const x = $("test");
const y = String(x);
const z = String(x);
$(y + z);

// Expected:
// const x = $("test");
// const str = $coerce(x, "string");
// const y = str;
// const z = str;
// $(y + z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const y /*:string*/ = $coerce(x, `string`);
const z /*:string*/ = $coerce(x, `string`);
const tmpCalleeParam /*:string*/ = y + z;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const y = $coerce(x, `string`);
$(y + $coerce(x, `string`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "string" );
const c = $coerce( a, "string" );
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const tmpStringFirstArg = x;
const y = $coerce(x, `string`);
const tmpStringFirstArg$1 = x;
const z = $coerce(x, `string`);
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
