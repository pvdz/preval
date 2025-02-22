# Preval test case

# try_finally_break.md

> Tests > Tofix > Try finally break
>
> Why is the non-looping loop not eliminated?

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(1);
  } finally {
    $(2);
    break;
  }
}
$(3);
`````

## Pre Normal


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        $(1);
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      $(2);
      break;
    }
    if ($implicitThrow) throw $finalCatchArg;
    else {
    }
  }
}
$(3);
`````

## Normalized


`````js filename=intro
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  $(1);
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
$(2);
$(3);
`````

## Output


`````js filename=intro
try {
  $(1);
} catch ($finalImplicit) {}
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
