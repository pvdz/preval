# Preval test case

# nested.md

> Try > Finally > Nested
>
> Finally transform checks

## Input

`````js filename=intro
try {
  try {
    $(1);
  } finally {
    $(2);
  }
} finally {
  try {
    $(3);
  } finally {
    $(4);
  }
}
`````


## Settled


`````js filename=intro
let $implicitThrow$3 /*:boolean*/ = false;
let $finalStep /*:boolean*/ = false;
let $finalCatchArg$3 /*:unknown*/ = undefined;
let $finalArg /*:unknown*/ = undefined;
$finally$3: {
  try {
    try {
      $(1);
    } catch ($finalImplicit) {
      $(2);
      $finalStep = true;
      $finalArg = $finalImplicit;
      break $finally$3;
    }
    $(2);
  } catch ($finalImplicit$3) {
    $implicitThrow$3 = true;
    $finalCatchArg$3 = $finalImplicit$3;
  }
}
try {
  $(3);
} catch ($finalImplicit$1) {
  $(4);
  throw $finalImplicit$1;
}
$(4);
if ($implicitThrow$3) {
  throw $finalCatchArg$3;
} else {
  if ($finalStep) {
    throw $finalArg;
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let $implicitThrow$3 = false;
let $finalStep = false;
let $finalCatchArg$3 = undefined;
let $finalArg = undefined;
$finally$3: {
  try {
    try {
      $(1);
    } catch ($finalImplicit) {
      $(2);
      $finalStep = true;
      $finalArg = $finalImplicit;
      break $finally$3;
    }
    $(2);
  } catch ($finalImplicit$3) {
    $implicitThrow$3 = true;
    $finalCatchArg$3 = $finalImplicit$3;
  }
}
try {
  $(3);
} catch ($finalImplicit$1) {
  $(4);
  throw $finalImplicit$1;
}
$(4);
if ($implicitThrow$3) {
  throw $finalCatchArg$3;
} else {
  if ($finalStep) {
    throw $finalArg;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
let b = false;
let c = undefined;
let d = undefined;
$finally$3: {
  try {
    try {
      $( 1 );
    }
    catch (e) {
      $( 2 );
      b = true;
      d = e;
      break $finally$3;
    }
    $( 2 );
  }
  catch (f) {
    a = true;
    c = f;
  }
}
try {
  $( 3 );
}
catch (g) {
  $( 4 );
  throw g;
}
$( 4 );
if (a) {
  throw c;
}
else {
  if (b) {
    throw d;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
