# Preval test case

# break-finally-dead.md

> Try > Finally > Break-finally-dead
> The try/finally always breaks or throws so subsequent statements are never visited
> The try node should handle that generically, just like the if-else (and infinite loops, later)

## Input

`````js filename=intro
{
  here: {
    try {
      $(1);
      break here;
    } finally {
      $(2);
    }

    // Dead code (we could detect this)
    $('remove me'); // not relevant to the ref test
  }
  
  $(3);
}
`````

## Pre Normal


`````js filename=intro
{
  here: {
    {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      $finally: {
        try {
          $(1);
          {
            $finalStep = true;
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
      else break here;
    }
    $(`remove me`);
  }
  $(3);
}
`````

## Normalized


`````js filename=intro
here: {
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      $finalStep = true;
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
    break here;
  }
}
$(3);
`````

## Output


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
}
catch (a) {
  $( 2 );
  throw a;
}
$( 2 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
