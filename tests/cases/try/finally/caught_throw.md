# Preval test case

# caught_throw.md

> Try > Finally > Caught throw
>
> Finally transform checks

## Input

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw 'testing'; // The finally should not trap this
  } catch {
    $('ok');
  }
} finally {
  $(2);
}
`````

## Pre Normal


`````js filename=intro
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(1);
      try {
        $();
        throw `testing`;
      } catch (e) {
        $(`ok`);
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
  else {
  }
}
`````

## Normalized


`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## Output


`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} catch ($finalImplicit) {
  $(2);
  throw $finalImplicit;
}
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  try {
    $();
    throw "testing";
  }
  catch (a) {
    $( "ok" );
  }
}
catch (b) {
  $( 2 );
  throw b;
}
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 'ok'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
