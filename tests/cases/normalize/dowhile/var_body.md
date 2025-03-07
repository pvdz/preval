# Preval test case

# var_body.md

> Normalize > Dowhile > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
do var x = 0; while (false);
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
while (true) {
  x = 0;
  if (false) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 0;
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
