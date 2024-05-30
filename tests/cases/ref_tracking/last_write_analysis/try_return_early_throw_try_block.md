# Preval test case

# try_return_early_throw_try_block.md

> Ref tracking > Last write analysis > Try return early throw try block
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    do_not_observe_assignment
    x = $(2, 'prevent optim');
    return x;
  } finally {
    x = $(3, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        do_not_observe_assignment;
        x = $(2, `prevent optim`);
        {
          $finalStep = true;
          $finalArg = x;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      x = $(3, `prevent optim`);
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      return $finalArg;
    }
  }
  $(`prevent return hoisting`);
  return x;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      do_not_observe_assignment;
      x = $(2, `prevent optim`);
      $finalStep = true;
      $finalArg = x;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  x = $(3, `prevent optim`);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      return $finalArg;
    } else {
      $(`prevent return hoisting`);
      return x;
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
let x = 1;
let $implicitThrow = false;
let $finalStep = false;
let $finalCatchArg = undefined;
let $finalArg = undefined;
try {
  do_not_observe_assignment;
  x = $(2, `prevent optim`);
  $finalStep = true;
  $finalArg = x;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
x = $(3, `prevent optim`);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  if ($finalStep) {
    tmpCalleeParam = $finalArg;
    $(tmpCalleeParam);
  } else {
    $(`prevent return hoisting`);
    tmpCalleeParam = x;
    $(tmpCalleeParam);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = 1;
let c = false;
let d = false;
let e = undefined;
let f = undefined;
try {
  do_not_observe_assignment;
  b = $( 2, "prevent optim" );
  d = true;
  f = b;
}
catch ($finalImplicit) {
  c = true;
  e = $finalImplicit;
}
b = $( 3, "prevent optim" );
if (c) {
  throw e;
}
else {
  if (d) {
    a = f;
    $( a );
  }
  else {
    $( "prevent return hoisting" );
    a = b;
    $( a );
  }
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

do_not_observe_assignment, $finalImplicit

## Result

Should call `$` with:
 - 1: 3, 'prevent optim'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
