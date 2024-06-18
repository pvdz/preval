# Preval test case

# base_try_finally.md

> Try > Base try finally
>
> Try base cases

## Input

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
`````

## Pre Normal


`````js filename=intro
$(1);
{
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      $(2);
    } catch ($finalImplicit) {
      $(3);
      throw $finalImplicit;
    }
  }
  {
    $(3);
  }
  if ($implicitThrow) throw $finalCatchArg;
  else {
  }
}
$(3);
`````

## Normalized


`````js filename=intro
$(1);
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(2);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
  $(3);
}
`````

## Output


`````js filename=intro
$(1);
try {
  $(2);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
try {
  $( 2 );
}
catch (a) {
  $( 3 );
  throw a;
}
$( 3 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
