# Preval test case

# redundant_labeled_break.md

> Tofix > Redundant labeled break
>
> The X: { try { break X } catch {} } case could be simplified
> and that's relevant with the elimination of finally.
> Check if tail statement of the try then check if parent is
> a labeled block with only the try as child and if so we can
> eliminate the break. the label will then also disappear for
> not being used anymore
>

## Input

`````js filename=intro
let x = 1;
here: {
  let $finalAbruptAction = 0;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      if ($) {
        x = 2;
        $finalAbruptAction = 1;
        break $finally; // Find a case where this sticks and then eliminate it
      } else {
        x = 3;
      }
    } catch ($finalImplicit) {
      $finalAbruptAction = 2;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(x);
  const tmpIfTest = $finalAbruptAction === 1;
  if (tmpIfTest) {
    break here;
  } else {
    const tmpIfTest$1 = $finalAbruptAction === 2;
    if (tmpIfTest$1) {
      throw $finalCatchArg;
    } else {
      $(x);
      x = 4;
    }
  }
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
here: {
  let $finalAbruptAction = 0;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      if ($) {
        x = 2;
        $finalAbruptAction = 1;
        break $finally;
      } else {
        x = 3;
      }
    } catch ($finalImplicit) {
      $finalAbruptAction = 2;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(x);
  const tmpIfTest = $finalAbruptAction === 1;
  if (tmpIfTest) {
    break here;
  } else {
    const tmpIfTest$1 = $finalAbruptAction === 2;
    if (tmpIfTest$1) {
      throw $finalCatchArg;
    } else {
      $(x);
      x = 4;
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
here: {
  let $finalAbruptAction = 0;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      if ($) {
        x = 2;
        $finalAbruptAction = 1;
        break $finally;
      } else {
        x = 3;
      }
    } catch ($finalImplicit) {
      $finalAbruptAction = 2;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(x);
  const tmpIfTest = $finalAbruptAction === 1;
  if (tmpIfTest) {
    break here;
  } else {
    const tmpIfTest$1 = $finalAbruptAction === 2;
    if (tmpIfTest$1) {
      throw $finalCatchArg;
    } else {
      $(x);
      x = 4;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
let $finalAbruptAction = 0;
let $finalCatchArg = undefined;
try {
  if ($) {
    x = 2;
    $finalAbruptAction = 1;
  } else {
    x = 3;
  }
} catch ($finalImplicit) {
  $finalAbruptAction = 2;
  $finalCatchArg = $finalImplicit;
}
$(x);
const tmpIfTest = $finalAbruptAction === 1;
if (tmpIfTest) {
} else {
  const tmpIfTest$1 = $finalAbruptAction === 2;
  if (tmpIfTest$1) {
    throw $finalCatchArg;
  } else {
    $(x);
    x = 4;
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 0;
let c = undefined;
try {
  if ($) {
    a = 2;
    b = 1;
  }
  else {
    a = 3;
  }
}
catch (d) {
  b = 2;
  c = d;
}
$( a );
const e = b === 1;
if (e) {

}
else {
  const f = b === 2;
  if (f) {
    throw c;
  }
  else {
    $( a );
    a = 4;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
