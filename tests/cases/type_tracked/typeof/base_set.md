# Preval test case

# base_set.md

> Type tracked > Typeof > Base set
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = new Set;
$(typeof x);
`````

## Settled


`````js filename=intro
new Set();
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new Set();
$(`object`);
`````

## Pre Normal


`````js filename=intro
const x = new Set();
$(typeof x);
`````

## Normalized


`````js filename=intro
const x = new Set();
const tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
new Set();
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
