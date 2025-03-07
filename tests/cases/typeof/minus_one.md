# Preval test case

# minus_one.md

> Typeof > Minus one
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -1);
`````

## Settled


`````js filename=intro
$(`number`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
`````

## Pre Normal


`````js filename=intro
$(typeof -1);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `number`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "number" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
