# Preval test case

# isarray_with_primitives.md

> Array > Static context > Isarray with primitives
>
> Array.isArray check

## Input

`````js filename=intro
$(Array.isArray([1,2,3]));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(Array.isArray([1, 2, 3]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = $Array_isArray(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
