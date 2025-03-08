# Preval test case

# var_body3.md

> Normalize > Try > Try > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
  var x;
} catch {

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
} catch (e) {}
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
