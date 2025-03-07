# Preval test case

# stmt_simple.md

> Normalize > Array > Stmt simple
>
> Array statements should be eliminated

## Input

`````js filename=intro
const a = $(1);
[a, 2, 3];
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
const a = $(1);
[a, 2, 3];
`````

## Normalized


`````js filename=intro
const a = $(1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
