# Preval test case

# bigint_prop.md

> Ai > Ai5 > Bigint prop
>
> Test normalization of numeric literal property access

## Input

`````js filename=intro
const obj = { "1": 1, "2": 2 };
const x = obj[1];
const y = obj[2];
$(x + y);

// Expected:
// const obj = { "1": 1, "2": 2 };
// const x = obj["1"];
// const y = obj["2"];
// $(x + y);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`1`]: 1, [`2`]: 2 };
const x /*:unknown*/ = obj[1];
const y /*:unknown*/ = obj[2];
const tmpCalleeParam /*:primitive*/ = x + y;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { [`1`]: 1, [`2`]: 2 };
const x = obj[1];
$(x + obj[2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "1" ]: 1,
  [ "2" ]: 2,
};
const b = a[ 1 ];
const c = a[ 2 ];
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`1`]: 1, [`2`]: 2 };
const x = obj[1];
const y = obj[2];
let tmpCalleeParam = x + y;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
