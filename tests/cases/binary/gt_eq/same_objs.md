# Preval test case

# same_objs.md

> Binary > Gt eq > Same objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = {};
$(x >= x);
`````

## Settled


`````js filename=intro
const x /*:object*/ = {};
x ** 0;
x ** 0;
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {};
x ** 0;
x ** 0;
$(true);
`````

## Pre Normal


`````js filename=intro
const x = {};
$(x >= x);
`````

## Normalized


`````js filename=intro
const x = {};
x >= x;
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
a ** 0;
a ** 0;
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
