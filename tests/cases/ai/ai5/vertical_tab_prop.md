# Preval test case

# vertical_tab_prop.md

> Ai > Ai5 > Vertical tab prop
>
> Test normalization of vertical tab property access

## Input

`````js filename=intro
const obj = { "\v": 1 };
const x = obj["\v"];
$(x);

// Expected:
// const obj = { "\v": 1 };
// const x = obj["\v"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { [`\u000b`]: 1 };
const x /*:unknown*/ = obj[`\u000b`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`\u000b`]: 1 }[`\u000b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "\u000b" ]: 1 };
const b = a[ "\u000b" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`\u000b`]: 1 };
const x = obj[`\u000b`];
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
