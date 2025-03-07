# Preval test case

# string_int_number_flt.md

> Normalize > Builtins > Math > Pow > String int number flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('3', 5.7));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(`3`, 5.7);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_pow(`3`, 5.7));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(`3`, 5.7));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $Math_pow(`3`, 5.7);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Math_pow( "3", 5.7 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 524.3136350338262
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Math_pow