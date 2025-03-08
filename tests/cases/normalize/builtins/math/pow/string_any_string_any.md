# Preval test case

# string_any_string_any.md

> Normalize > Builtins > Math > Pow > String any string any
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('nope', 'foo'));
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
$(Math.pow(`nope`, `foo`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
$(NaN);
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
