# Preval test case

# var_body2.md

> Normalize > Try > Finally > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} finally {
  var x = 10;
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
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
    } catch ($finalImplicit) {
      x = 10;
      throw $finalImplicit;
    }
  }
  {
    x = 10;
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
x = 10;
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
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
