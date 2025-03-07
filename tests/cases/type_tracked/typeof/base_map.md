# Preval test case

# base_map.md

> Type tracked > Typeof > Base map
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = new Map;
$(typeof x);
`````

## Settled


`````js filename=intro
new Map();
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new Map();
$(`object`);
`````

## Pre Normal


`````js filename=intro
const x = new Map();
$(typeof x);
`````

## Normalized


`````js filename=intro
const x = new Map();
const tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
new Map();
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
