# Preval test case

# math_random_direct_0args.md

> Builtins cases > Ai math > Math random direct 0args
>
> Test Math.random with 0 arguments

## Input

`````js filename=intro
const result = Math.random();
$(result >= 0 && result < 1);
// Expected: A number between 0 (inclusive) and 1 (exclusive)
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_random;
const result = 0.12556649118791485;
let tmpCalleeParam = result >= 0;
if (tmpCalleeParam) {
  tmpCalleeParam = result < 1;
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
