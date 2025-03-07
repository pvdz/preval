# Preval test case

# var_body2.md

> Normalize > Label > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
test: var x = 0;
$(x);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
test: x = 0;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 0;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
