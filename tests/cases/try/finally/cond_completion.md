# Preval test case

# cond_completion.md

> Try > Finally > Cond completion
>
>

## Input

`````js filename=intro
function f(){
  try {
    if (a) return 1;
    if (b) throw 2;
  } finally {
    return 3;
  }
}
log(f());
`````

## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = log;
if (a) {
  tmpCallCallee(3);
} else {
  b;
  tmpCallCallee(3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = log;
if (a) {
  tmpCallCallee(3);
} else {
  b;
  tmpCallCallee(3);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalStep$1 = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    let $finalArg$1 = undefined;
    $finally: {
      try {
        if (a) {
          $finalStep = true;
          $finalArg = 1;
          break $finally;
        }
        if (b) {
          $finalStep$1 = true;
          $finalArg$1 = 2;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      return 3;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else if ($finalStep) return $finalArg;
    else if ($finalStep$1) throw $finalArg$1;
    else {
    }
  }
};
log(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalStep$1 = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  let $finalArg$1 = undefined;
  $finally: {
    try {
      if (a) {
        $finalStep = true;
        $finalArg = 1;
        break $finally;
      } else {
        if (b) {
          $finalStep$1 = true;
          $finalArg$1 = 2;
          break $finally;
        } else {
        }
      }
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return 3;
};
const tmpCallCallee = log;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const c = log;
if (a) {
  c( 3 );
}
else {
  b;
  c( 3 );
}
`````

## Globals

BAD@! Found 3 implicit global bindings:

log, a, b

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
