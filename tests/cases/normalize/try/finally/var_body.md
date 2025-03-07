# Preval test case

# var_body.md

> Normalize > Try > Finally > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} finally {
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
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
let $implicitThrow = false;
let $finalCatchArg = undefined;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
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
