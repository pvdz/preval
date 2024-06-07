# Preval test case

# base_try_catch_finally.md

> Try > Base try catch finally
>
> Try base cases

#TODO

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
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
$(4);
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
  $(4);
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
$(4);
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
$( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
