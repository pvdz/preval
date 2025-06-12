# Preval test case

# math_random_call_ctx_1arg.md

> Builtins cases > Ai math > Math random call ctx 1arg
>
> Test Math.random with call context and 1 argument

## Input

`````js filename=intro
const result = Math.random.call(null, 2);
$(result >= 0 && result < 1);
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
const tmpMCOO = $Math_random;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, null, 2);
let tmpCalleeParam = result >= 0;
if (tmpCalleeParam) {
  tmpCalleeParam = result < 1;
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) transitive reduction with opposite range checks
- (todo) type trackeed tricks can possibly support static $Math_random


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
