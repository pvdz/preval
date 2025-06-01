# Preval test case

# infinity_prop.md

> Ai > Ai5 > Infinity prop
>
> Test normalization of infinity property access

## Input

`````js filename=intro
const obj = { "Infinity": 1, "-Infinity": 2 };
const x = obj[Infinity];
const y = obj[-Infinity];
$(x + y);

// Expected:
// const obj = { "Infinity": 1, "-Infinity": 2 };
// const x = obj["Infinity"];
// const y = obj["-Infinity"];
// $(x + y);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { Infinity: 1, [`-Infinity`]: 2 };
const x /*:unknown*/ = obj[$Number_POSITIVE_INFINITY];
const y /*:unknown*/ = obj[$Number_NEGATIVE_INFINITY];
const tmpCalleeParam /*:primitive*/ = x + y;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { Infinity: 1, [`-Infinity`]: 2 };
const x = obj[$Number_POSITIVE_INFINITY];
$(x + obj[$Number_NEGATIVE_INFINITY]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  Infinity: 1,
  [ "-Infinity" ]: 2,
};
const b = a[ $Number_POSITIVE_INFINITY ];
const c = a[ $Number_NEGATIVE_INFINITY ];
const d = b + c;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { Infinity: 1, [`-Infinity`]: 2 };
const x = obj[Infinity];
const y = obj[-Infinity];
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
