# Preval test case

# string_flt_string_int.md

> Normalize > Builtins > Math > Pow > String flt string int
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3.7', '2'));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(`3.7`, `2`);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_pow(`3.7`, `2`));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(`3.7`, `2`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $Math_pow(`3.7`, `2`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Math_pow( "3.7", "2" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 13.690000000000001
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_pow
