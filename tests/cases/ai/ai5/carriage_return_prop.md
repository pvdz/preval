# Preval test case

# carriage_return_prop.md

> Ai > Ai5 > Carriage return prop
>
> Test normalization of carriage return property access

## Input

`````js filename=intro
const obj = { "\r": 1 };
const x = obj["\r"];
$(x);

// Expected:
// const obj = { "\r": 1 };
// const x = obj["\r"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`\u000d`]: 1 };
const x /*:unknown*/ = obj[`\u000d`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`\u000d`]: 1 }[`\u000d`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "\u000d" ]: 1 };
const b = a[ "\u000d" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`\u000d`]: 1 };
const x = obj[`\u000d`];
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
