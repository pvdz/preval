# Preval test case

# string_prop_normalize.md

> Ai > Ai5 > String prop normalize
>
> Test normalization of string property access

## Input

`````js filename=intro
const obj = { "prop-name": 1 };
const x = obj["prop-name"];
$(x);

// Expected:
// const obj = { "prop-name": 1 };
// const x = obj["prop-name"];  // Note: This one stays as is because prop-name is not a valid identifier
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`prop-name`]: 1 };
const x /*:unknown*/ = obj[`prop-name`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`prop-name`]: 1 }[`prop-name`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "prop-name" ]: 1 };
const b = a[ "prop-name" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`prop-name`]: 1 };
const x = obj[`prop-name`];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
