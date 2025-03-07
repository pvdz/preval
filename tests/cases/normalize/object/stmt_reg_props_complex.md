# Preval test case

# stmt_reg_props_complex.md

> Normalize > Object > Stmt reg props complex
>
> Objects as statement should be eliminated

## Input

`````js filename=intro
({x: $(1), y: $(2)});
`````

## Settled


`````js filename=intro
$(1);
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````

## Pre Normal


`````js filename=intro
({ x: $(1), y: $(2) });
`````

## Normalized


`````js filename=intro
$(1);
$(2);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
