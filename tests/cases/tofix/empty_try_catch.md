# Preval test case

# empty_try_catch.md

> Tofix > Empty try catch
>
> If the try is empty then the catch can't trigger and we can safely eliminate it

#TODO

## Input

`````js filename=intro
let x = 1;
try { }
catch {
  // This block can be dropped safely
  $(x);
  x = 2;
}
finally {
  $(x);
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
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
    $(x);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
let $implicitThrow = false;
let $finalCatchArg = undefined;
$(x);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(x);
}
`````

## Output

`````js filename=intro
$(1);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
