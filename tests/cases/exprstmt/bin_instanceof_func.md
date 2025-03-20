# Preval test case

# bin_instanceof_func.md

> Exprstmt > Bin instanceof func
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof Number;
`````


## Settled


`````js filename=intro
undefined instanceof Number;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined instanceof Number;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined instanceof Number;
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
