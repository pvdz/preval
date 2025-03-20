# Preval test case

# number_int_string_flt.md

> Normalize > Builtins > Math > Pow > Number int string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3, '3.7'));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(3, `3.7`);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_pow(3, `3.7`));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(3, `3.7`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $Math_pow(3, `3.7`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Math_pow( 3, "3.7" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 58.25707055931402
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_pow
