# Preval test case

# number_int_string_any.md

> Normalize > Builtins > Math > Pow > Number int string any
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3, 'foo'));
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
$(Math.pow(3, `foo`));
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
