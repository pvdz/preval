# Preval test case

# numeric_string_prop.md

> Ai > Ai5 > Numeric string prop
>
> Test normalization of numeric string property access

## Input

`````js filename=intro
const obj = { "0": 1, "1": 2 };
const x = obj["0"];
const y = obj["1"];
$(x + y);

// Expected:
// const obj = { "0": 1, "1": 2 };
// const x = obj[0];
// const y = obj[1];
// $(x + y);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { [`0`]: 1, [`1`]: 2 };
const x /*:unknown*/ = obj[`0`];
const y /*:unknown*/ = obj[`1`];
const tmpCalleeParam /*:primitive*/ = x + y;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { [`0`]: 1, [`1`]: 2 };
const x = obj[`0`];
$(x + obj[`1`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ "0" ]: 1,
  [ "1" ]: 2,
};
const b = a[ "0" ];
const c = a[ "1" ];
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { [`0`]: 1, [`1`]: 2 };
const x = obj[`0`];
const y = obj[`1`];
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
