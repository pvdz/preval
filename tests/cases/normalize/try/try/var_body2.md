# Preval test case

# var_body2.md

> Normalize > Try > Try > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
  var x = 10;
} catch {

}
$(x);
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
try {
  x = 10;
} catch (e) {}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
try {
  x = 10;
} catch (e) {}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
