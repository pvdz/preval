# Preval test case

# try_finally_throw.md

> Try > Finally > Try finally throw
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  throw 'exit';
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
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
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
    $(2);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else throw $finalArg;
}
`````

## Normalized

`````js filename=intro
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
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  throw $finalArg;
}
`````

## Output

`````js filename=intro
$(2);
throw `exit`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
throw "exit";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ exit ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
