# Preval test case

# negative_zero_prop.md

> Ai > Ai5 > Negative zero prop
>
> Test normalization of negative zero property access

## Input

`````js filename=intro
const obj = { "-0": 1, "0": 2 };
const x = obj[-0];
$(x);

// Expected:
// const obj = { "-0": 1, "0": 2 };
// const x = obj["-0"];
// $(x);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`-0`]: 1, [`0`]: 2 };
const x /*:unknown*/ = obj[-0];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`-0`]: 1, [`0`]: 2 }[-0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "-0" ]: 1,
  [ "0" ]: 2,
};
const b = a[ -0 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`-0`]: 1, [`0`]: 2 };
const x = obj[-0];
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
