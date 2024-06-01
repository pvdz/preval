# Preval test case

# try_hell_i.md

> Flow > Try finally throw early > Try hell i
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
  
  } finally {
    throw_early
    // The finally always executes so there's no question that x mutates
    x = 1
  }
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
foo: {
  {
    let $implicitThrow = false;
    let $finalStep = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        {
          $finalStep = true;
          break $finally;
        }
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      throw_early;
      x = 1;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else break foo;
  }
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
foo: {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $finalStep = true;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  throw_early;
  x = 1;
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    break foo;
  }
}
considerMutated(x);
`````

## Output

`````js filename=intro
throw_early;
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
throw_early;
considerMutated( 1 );
`````

## Globals

BAD@! Found 2 implicit global bindings:

throw_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
