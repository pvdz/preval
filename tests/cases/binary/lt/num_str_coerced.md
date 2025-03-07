# Preval test case

# num_str_coerced.md

> Binary > Lt > Num str coerced
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 < '1');
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
$(1 < `1`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = false;
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
