# Preval test case

# unused_label_falsy_if.md

> Labels > Unused label falsy if
>
> Labels should not throw

## Input

`````js filename=intro
foo: if (false) $(1);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
