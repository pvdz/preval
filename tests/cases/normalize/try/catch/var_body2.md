# Preval test case

# var_body2.md

> Normalize > Try > Catch > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} catch {
  var x = 10;
}
$(x);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
try {
} catch (e) {
  x = 10;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(undefined);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
