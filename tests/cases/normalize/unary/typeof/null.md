# Preval test case

# null.md

> Normalize > Unary > Typeof > Null
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof null);
`````

## Settled


`````js filename=intro
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````

## Pre Normal


`````js filename=intro
$(typeof null);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `object`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
