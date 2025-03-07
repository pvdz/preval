# Preval test case

# one.md

> Plus unary > One
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+1);
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
$(+1);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 1;
$(tmpCalleeParam);
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
