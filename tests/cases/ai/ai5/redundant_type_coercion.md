# Preval test case

# redundant_type_coercion.md

> Ai > Ai5 > Redundant type coercion
>
> Test elimination of redundant type coercions

## Input

`````js filename=intro
const input = $("test");
const x = String(input);
const y = String(input);
$(x);
$(y);
// Expected output:
// const input = $("test");
// const tmp = String(input);
// const x = tmp;
// const y = tmp;
// $(x);
// $(y);
`````


## Settled


`````js filename=intro
const input /*:unknown*/ = $(`test`);
const x /*:string*/ = $coerce(input, `string`);
const y /*:string*/ = $coerce(input, `string`);
$(x);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const input = $(`test`);
const x = $coerce(input, `string`);
const y = $coerce(input, `string`);
$(x);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = $coerce( a, "string" );
const c = $coerce( a, "string" );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const input = $(`test`);
const tmpStringFirstArg = input;
const x = $coerce(input, `string`);
const tmpStringFirstArg$1 = input;
const y = $coerce(input, `string`);
$(x);
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
 - 3: 'test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
