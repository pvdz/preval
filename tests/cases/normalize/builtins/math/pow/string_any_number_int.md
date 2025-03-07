# Preval test case

# string_any_number_int.md

> Normalize > Builtins > Math > Pow > String any number int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('foo', 5));
`````

## Settled


`````js filename=intro
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````

## Pre Normal


`````js filename=intro
$(Math.pow(`foo`, 5));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
