# Preval test case

# number_obj_twice.md

> Normalize > Spread > Number obj twice
>
> Spread on number is an error

## Input

`````js filename=intro
const x = 100;
const y = 200;
$({...x, ...y});
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
`````

## Pre Normal


`````js filename=intro
const x = 100;
const y = 200;
$({ ...x, ...y });
`````

## Normalized


`````js filename=intro
const x = 100;
const y = 200;
const tmpCalleeParam = { ...x, ...y };
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
