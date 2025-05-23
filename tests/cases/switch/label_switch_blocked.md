# Preval test case

# label_switch_blocked.md

> Switch > Label switch blocked
>
> This did not triggered the edge case in the pre transform

## Input

`````js filename=intro
e: { switch (x) {} }
`````


## Settled


`````js filename=intro
x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
`````


## PST Settled
With rename=true

`````js filename=intro
x;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchDisc = x;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
