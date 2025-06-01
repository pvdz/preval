# Preval test case

# space_string_prop.md

> Ai > Ai5 > Space string prop
>
> Test normalization of space string property access

## Input

`````js filename=intro
const obj = { " ": 1 };
const x = obj[" "];
$(x);

// Expected:
// const obj = { " ": 1 };
// const x = obj[" "];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [` `]: 1 };
const x /*:unknown*/ = obj[` `];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [` `]: 1 }[` `]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ " " ]: 1 };
const b = a[ " " ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [` `]: 1 };
const x = obj[` `];
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
