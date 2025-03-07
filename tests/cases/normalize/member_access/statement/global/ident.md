# Preval test case

# ident.md

> Normalize > Member access > Statement > Global > Ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$.length;
`````

## Settled


`````js filename=intro
$.length;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$.length;
`````

## Pre Normal


`````js filename=intro
$.length;
`````

## Normalized


`````js filename=intro
$.length;
`````

## PST Settled
With rename=true

`````js filename=intro
$.length;
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
