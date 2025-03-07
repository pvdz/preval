# Preval test case

# concat.md

> Base > Concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````

## Settled


`````js filename=intro
$(`ab`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ab`);
`````

## Pre Normal


`````js filename=intro
$(`a` + `b`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `ab`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "ab" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
