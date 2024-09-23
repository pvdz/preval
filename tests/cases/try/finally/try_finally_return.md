# Preval test case

# try_finally_return.md

> Try > Finally > Try finally return
>
> Finally transform checks

## Input

`````js filename=intro
function f() {
  try {
    throw 'exit';
  } finally {
    $(2);
  }
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    let $finalArg = undefined;
    $finally: {
      try {
        {
          $finalStep = true;
          $finalArg = `exit`;
          break $finally;
        }
      } catch ($finalImplicit) {
        $(2);
        throw $finalImplicit;
      }
    }
    {
      $(2);
    }
    if ($implicitThrow) throw $finalCatchArg;
    else throw $finalArg;
  }
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      $finalArg = `exit`;
      break $finally;
    } catch ($finalImplicit) {
      $(2);
      throw $finalImplicit;
    }
  }
  $(2);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    throw $finalArg;
  }
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  $(2);
  throw `exit`;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 2 );
  throw "exit";
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
