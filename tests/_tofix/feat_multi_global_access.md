# Preval test case

# feat_multi_global_access.md

> Tofix > feat multi global access
>
> Writing to an implicit global

accessing a global as a statement (for crash retention) can be eliminated when there's a guaranteed previous read or write to that same binding
if the binding is guaranteed to be accessed next, without observable side effects, then that's fine too (a; const x = a + 1;)

existing test

## Input

`````js filename=intro
$(a = 5);
`````


## Settled


`````js filename=intro
a = 5;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = 5;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
a = 5;
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
