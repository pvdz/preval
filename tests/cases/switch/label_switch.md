# Preval test case

# label_switch.md

> Switch > Label switch
>
> This triggered an edge case in the pre transform
> Key part was the switch being a direct child of the label, no block in between

## Input

`````js filename=intro
goto: switch (x) {}
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
