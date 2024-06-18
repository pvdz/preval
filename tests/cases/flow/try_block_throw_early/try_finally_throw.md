# Preval test case

# try_finally_throw.md

> Flow > Try block throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

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
        $(`still throws`);
        $(x);
        throw $finalImplicit;
      }
    }
    {
      $(`still throws`);
      $(x);
    }
    if ($implicitThrow) throw $finalCatchArg;
    else throw $finalArg;
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
      $(`still throws`);
      $(x);
      throw $finalImplicit;
    }
  }
  $(`still throws`);
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    throw $finalArg;
  }
};
f();
`````

## Output


`````js filename=intro
let x = `pass`;
try {
  fail_early;
  x = `fail`;
} catch ($finalImplicit) {
  $(`still throws`);
  $(x);
  throw $finalImplicit;
}
$(`still throws`);
$(x);
throw `yes`;
`````

## PST Output

With rename=true

`````js filename=intro
let a = "pass";
try {
  fail_early;
  a = "fail";
}
catch (b) {
  $( "still throws" );
  $( a );
  throw b;
}
$( "still throws" );
$( a );
throw "yes";
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_early

## Result

Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
