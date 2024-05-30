# Preval test case

# try_finally_throw.md

> Flow > Try block throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  try {
    fail_early
    x = 'fail';
    throw 'yes';
  } finally {
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        fail_early;
        x = `fail`;
        {
          $finalStep = true;
          $finalArg = `yes`;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      $(`still throws`);
      $(x);
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
    if ($finalStep) {
      throw $finalArg;
    }
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      fail_early;
      x = `fail`;
      $finalStep = true;
      $finalArg = `yes`;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(`still throws`);
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    if ($finalStep) {
      throw $finalArg;
    } else {
      $(x);
      return undefined;
    }
  }
};
f();
`````

## Output

`````js filename=intro
let x = `pass`;
let $implicitThrow = false;
let $finalStep = false;
let $finalCatchArg = undefined;
let $finalArg = undefined;
try {
  fail_early;
  x = `fail`;
  $finalStep = true;
  $finalArg = `yes`;
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(`still throws`);
$(x);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  if ($finalStep) {
    throw $finalArg;
  } else {
    $(x);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = "pass";
let b = false;
let c = false;
let d = undefined;
let e = undefined;
try {
  fail_early;
  a = "fail";
  c = true;
  e = "yes";
}
catch ($finalImplicit) {
  b = true;
  d = $finalImplicit;
}
$( "still throws" );
$( a );
if (b) {
  throw d;
}
else {
  if (c) {
    throw e;
  }
  else {
    $( a );
  }
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

fail_early, $finalImplicit

## Result

Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
