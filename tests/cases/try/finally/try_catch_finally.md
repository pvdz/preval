# Preval test case

# try_catch_finally.md

> Try > Finally > Try catch finally
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
} finally {
  $(3);
}
`````

## Settled


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
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
      $(3);
      throw $finalImplicit;
    }
  }
  {
    $(3);
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
  $(3);
  throw $finalImplicit;
}
$(3);
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
  $( 3 );
  throw a;
}
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
