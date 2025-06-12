# Preval test case

# math_random_direct_1arg.md

> Builtins cases > Ai math > Math random direct 1arg
>
> Test Math.random with 1 argument

## Input

`````js filename=intro
const result = Math.random(2);
result >= 0 && result < 1;
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_random;
const result = 0.12556649118791485;
const tmpIfTest = result >= 0;
if (tmpIfTest) {
  result < 0;
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
