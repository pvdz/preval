# Preval test case

# empty_block_with_finalizer.md

> Try > Noop > Empty block with finalizer
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f() {
  try {
  } finally {
    $('pass');
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      $(`pass`);
    }
    if ($implicitThrow) throw $finalCatchArg;
    else {
    }
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $(`pass`);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
