# Preval test case

# alias_assigned_in_catch.md

> Ternary alias > Ai silly contrived > Alias assigned in catch
>
> Assignment happens inside a catch block

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
try {} catch (e) { b = a; }
$(b);
// Expect: No change, assignment in catch is not safe
`````


## Settled


`````js filename=intro
$(true);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
$(undefined);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
