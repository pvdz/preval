# Preval test case

# same_str_diff_ids.md

> Binary > Eq weak > Same str diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = 'xyz';
const y = x;
$(x == y);
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
const x = `xyz`;
const y = x;
$(x == y);
`````

## Normalized


`````js filename=intro
const x = `xyz`;
const y = x;
const tmpCalleeParam = x == y;
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
