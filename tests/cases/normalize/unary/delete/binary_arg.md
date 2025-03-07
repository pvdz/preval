# Preval test case

# binary_arg.md

> Normalize > Unary > Delete > Binary arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete (1 + 1));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(delete (1 + 1));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
