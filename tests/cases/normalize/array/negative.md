# Preval test case

# negative.md

> Normalize > Array > Negative
>
> Make sure negative numbers are considered a literal too

The AST node for negative numbers is a unary expression so it requires an explicit check for negative numbers.

## Input

`````js filename=intro
$([-100]);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [-100];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([-100]);
`````

## Pre Normal


`````js filename=intro
$([-100]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [-100];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ -100 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [-100]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
