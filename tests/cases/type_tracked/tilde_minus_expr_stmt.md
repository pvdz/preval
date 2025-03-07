# Preval test case

# tilde_minus_expr_stmt.md

> Type tracked > Tilde minus expr stmt
>
> Something that caught my eye

## Input

`````js filename=intro
const x = ~-0x4;
x >> NaN;
$('finished');
`````

## Settled


`````js filename=intro
$(`finished`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`finished`);
`````

## Pre Normal


`````js filename=intro
const x = ~-4;
x >> NaN;
$(`finished`);
`````

## Normalized


`````js filename=intro
const x = 3;
x >> 0;
$(`finished`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "finished" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
