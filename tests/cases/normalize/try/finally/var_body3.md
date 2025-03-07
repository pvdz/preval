# Preval test case

# var_body3.md

> Normalize > Try > Finally > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} finally {
  var x;
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
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
let $implicitThrow = false;
let $finalCatchArg = undefined;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
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
