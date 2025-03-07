# Preval test case

# eq_arr_number_lit.md

> Type tracked > Eqeqeq > Eq arr number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x === 2); // Must be false
`````

## Settled


`````js filename=intro
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````

## Pre Normal


`````js filename=intro
const x = [1, 2, 3];
$(x === 2);
`````

## Normalized


`````js filename=intro
const x = [1, 2, 3];
const tmpCalleeParam = x === 2;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
