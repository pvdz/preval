# Preval test case

# caught_break.md

> Try > Finally > Caught break
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
  A: {
    $(2);
    if ($(3)) {
      break A; // This break does not escape the finally so it should not be trapped by it
    }
    $(4);
  }
} finally {
  $(5);
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
      A: {
        $(2);
        if ($(3)) {
          break A;
        }
        $(4);
      }
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  {
    $(5);
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  }
}
`````

## Normalized

`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
  A: {
    $(2);
    const tmpIfTest = $(3);
    if (tmpIfTest) {
      break A;
    } else {
      $(4);
    }
  }
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(5);
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
  $(2);
  const tmpIfTest = $(3);
  if (tmpIfTest) {
  } else {
    $(4);
  }
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(5);
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
  $( 2 );
  const c = $( 3 );
  if (c) {

  }
  else {
    $( 4 );
  }
}
catch (d) {
  a = true;
  b = d;
}
$( 5 );
if (a) {
  throw b;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
