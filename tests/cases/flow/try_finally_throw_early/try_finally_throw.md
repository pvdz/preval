# Preval test case

# try_finally_throw.md

> Flow > Try finally throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } finally {
    throw_early
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
  let x = `fail`;
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        x = `pass`;
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
      throw_early;
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
  let x = `fail`;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      x = `pass`;
      $finalStep = true;
      $finalArg = `yes`;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  throw_early;
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
throw_early;
$(`still throws`);
$(`pass`);
throw `yes`;
`````

## PST Output

With rename=true

`````js filename=intro
throw_early;
$( "still throws" );
$( "pass" );
throw "yes";
`````

## Globals

BAD@! Found 1 implicit global bindings:

throw_early

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
