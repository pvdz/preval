# Preval test case

# try_finally.md

> Try > Finally > Try finally
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
} finally {
  $(2);
}
`````

## Settled


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````

## Pre Normal


`````js filename=intro
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
    } catch ($finalImplicit) {
      $(2);
      throw $finalImplicit;
    }
  }
  {
    $(2);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
`````

## Normalized


`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {
  $( 2 );
  throw a;
}
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
