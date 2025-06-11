# Preval test case

# math_random_range.md

> Math > Ai > Math random range
>
> Math.random is within [0, 1)

## Input

`````js filename=intro
const a = Math.random();
$(a >= 0 && a < 1);
// Should be true
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
const a = 0.12556649118791485;
let tmpCalleeParam = a >= 0;
if (tmpCalleeParam) {
  tmpCalleeParam = a < 1;
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
