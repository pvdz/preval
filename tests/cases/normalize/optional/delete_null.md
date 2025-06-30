# Preval test case

# delete_null.md

> Normalize > Optional > Delete null
>
> Delete on member expression is special casing. Works with optional chaining.

## Input

`````js filename=intro
$(delete null?.x);
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
const tmpDeleteOpt = null;
let tmpCalleeParam = true;
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  tmpCalleeParam = delete tmpDeleteOpt.x;
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


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
