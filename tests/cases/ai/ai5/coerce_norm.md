# Preval test case

# coerce_norm.md

> Ai > Ai5 > Coerce norm
>
> Test coercion normalization

## Input

`````js filename=intro
const x = $(1);
const str = String(x);
$(str);

// Expected:
// const x = $(1);
// const str = $coerce(x, "string");
// $(str);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const str /*:string*/ = $coerce(x, `string`);
$(str);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const str = $coerce(x, `string`);
$(str);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
