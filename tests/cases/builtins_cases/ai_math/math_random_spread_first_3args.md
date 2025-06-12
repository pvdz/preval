# Preval test case

# math_random_spread_first_3args.md

> Builtins cases > Ai math > Math random spread first 3args
>
> Test Math.random with spread operator on first argument and 3 total arguments

## Input

`````js filename=intro
const args = [1, 2, 3];
const result = Math.random(...args);
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
const args = [1, 2, 3];
const tmpMCF = $Math_random;
[...args];
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
