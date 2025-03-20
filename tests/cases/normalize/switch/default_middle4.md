# Preval test case

# default_middle4.md

> Normalize > Switch > Default middle4
>
> Normalize switches

## Input

`````js filename=intro
let onlyNumbers = 0;
if ($) {
  onlyNumbers = 1;
} else {
}
onlyNumbers ** 0;
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
