# Preval test case

# diff_objs_diff_ids.md

> Binary > Gt > Diff objs diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
const y = x;
$(x > y);
`````

## Settled


`````js filename=intro
const x /*:object*/ = {};
x ** 0;
x ** 0;
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {};
x ** 0;
x ** 0;
$(false);
`````

## Pre Normal


`````js filename=intro
const x = {};
const y = x;
$(x > y);
`````

## Normalized


`````js filename=intro
const x = {};
const y = x;
const tmpCalleeParam = x > y;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a ** 0;
a ** 0;
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
