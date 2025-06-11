# Preval test case

# set_with_negzero_and_zero.md

> Math > Ai > Set with negzero and zero
>
> Set treats -0 and 0 as the same key

## Input

`````js filename=intro
const s = new Set();
s.add(-0);
s.add(0);
$(s.size);
// Should be 1
`````


## Settled


`````js filename=intro
const s /*:set*/ /*truthy*/ = new $set_constructor();
$dotCall($set_add, s, `add`, -0);
$dotCall($set_add, s, `add`, 0);
const tmpCalleeParam /*:number*/ = s.size;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = new $set_constructor();
$dotCall($set_add, s, `add`, -0);
$dotCall($set_add, s, `add`, 0);
$(s.size);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $set_constructor();
$dotCall( $set_add, a, "add", -0 );
$dotCall( $set_add, a, "add", 0 );
const b = a.size;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const s = new $set_constructor();
const tmpMCF = s.add;
$dotCall(tmpMCF, s, `add`, -0);
const tmpMCF$1 = s.add;
$dotCall(tmpMCF$1, s, `add`, 0);
let tmpCalleeParam = s.size;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $set_add
- (todo) type trackeed tricks can possibly support static $set_add


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
