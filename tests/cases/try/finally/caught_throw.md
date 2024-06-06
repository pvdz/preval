# Preval test case

# caught_throw.md

> Try > Finally > Caught throw
>
> Finally transform checks

#TODO

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
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
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
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## Output


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
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(2);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
let b = undefined;
try {
  $( 1 );
  try {
    $();
    throw "testing";
  }
catch (c) {
    $( "ok" );
  }
}
catch (d) {
  a = true;
  b = d;
}
$( 2 );
if (a) {
  throw b;
}
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
