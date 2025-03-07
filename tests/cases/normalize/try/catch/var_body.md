# Preval test case

# var_body.md

> Normalize > Try > Catch > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} catch {
  var x;
}
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let x = undefined;
try {
} catch (e) {}
`````

## Normalized


`````js filename=intro
let x = undefined;
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
