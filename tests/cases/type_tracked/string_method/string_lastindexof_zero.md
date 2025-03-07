# Preval test case

# string_lastindexof_zero.md

> Type tracked > String method > String lastindexof zero
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf());
`````

## Settled


`````js filename=intro
$(-1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````

## Pre Normal


`````js filename=intro
$(`hello`.lastIndexOf());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.lastIndexOf();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
