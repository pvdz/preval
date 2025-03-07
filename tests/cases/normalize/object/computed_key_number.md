# Preval test case

# computed_key_number.md

> Normalize > Object > Computed key number
>
> Computed key that is a number value might as well not be computed

## Input

`````js filename=intro
$({[100]: 10});
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [100]: 10 };
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [100]: 10 });
`````

## Pre Normal


`````js filename=intro
$({ [100]: 10 });
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { [100]: 10 };
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 100 ]: 10 };
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 100: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
