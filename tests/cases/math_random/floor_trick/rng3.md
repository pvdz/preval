# Preval test case

# rng3.md

> Math random > Floor trick > Rng3
>
> In this case the result is 1 2 or 3 and we can't really predict much more than that.

## Input

`````js filename=intro
const r = Math.random();
const a = r * 3;
const is_012 = Math.floor(a);
const is_123 = is_012 + 1;
$(is_123 === 1 || is_123 === 2 || is_123 === 3);
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
const r = 0.12556649118791485;
const a = r * 3;
const tmpMCF$1 = $Math_floor;
const is_012 = $Math_floor(a);
const is_123 = is_012 + 1;
let tmpCalleeParam = is_123 === 1;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = is_123 === 2;
  if (tmpCalleeParam) {
    $(tmpCalleeParam);
  } else {
    tmpCalleeParam = is_123 === 3;
    $(tmpCalleeParam);
  }
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_floor


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
