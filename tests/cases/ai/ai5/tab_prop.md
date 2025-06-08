# Preval test case

# tab_prop.md

> Ai > Ai5 > Tab prop
>
> Test normalization of tab property access

## Input

`````js filename=intro
const obj = { "\t": 1 };
const x = obj["\t"];
$(x);

// Expected:
// const obj = { "\t": 1 };
// const x = obj["\t"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { [`\u0009`]: 1 };
const x /*:unknown*/ = obj[`\u0009`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`\u0009`]: 1 }[`\u0009`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "\u0009" ]: 1 };
const b = a[ "\u0009" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`\u0009`]: 1 };
const x = obj[`\u0009`];
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
