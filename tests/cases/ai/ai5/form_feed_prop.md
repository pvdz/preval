# Preval test case

# form_feed_prop.md

> Ai > Ai5 > Form feed prop
>
> Test normalization of form feed property access

## Input

`````js filename=intro
const obj = { "\f": 1 };
const x = obj["\f"];
$(x);

// Expected:
// const obj = { "\f": 1 };
// const x = obj["\f"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`\u000c`]: 1 };
const x /*:unknown*/ = obj[`\u000c`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`\u000c`]: 1 }[`\u000c`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "\u000c" ]: 1 };
const b = a[ "\u000c" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`\u000c`]: 1 };
const x = obj[`\u000c`];
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
