# Preval test case

# preval_knows.md

> Tofix > preval knows

Eliminate the dud statement. Restore the result of this to the
`$( "function String() { [native code] }" );` it was before.

## Input

`````js filename=intro
const arr = ['toString'];       // preval knows
const arr2 = Array.from(arr);
const xyz = String[arr]();
$(xyz);
`````


## Settled


`````js filename=intro
$(`function String() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function String() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function String() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`toString`];
const tmpMCF = $Array_from;
const arr2 = $Array_from(arr);
const tmpMCF$1 = String[arr];
const xyz = $dotCall(tmpMCF$1, $string_constructor, undefined);
$(xyz);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
