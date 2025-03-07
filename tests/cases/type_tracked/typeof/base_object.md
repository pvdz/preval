# Preval test case

# base_object.md

> Type tracked > Typeof > Base object
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = {a: 1};
$(typeof x);
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
const x = { a: 1 };
$(typeof x);
`````

## Normalized


`````js filename=intro
const x = { a: 1 };
const tmpCalleeParam = typeof x;
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
