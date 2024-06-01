# Preval test case

# nested.md

> Try > Finally > Nested
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  try {
    $(1);
  } finally {
    $(2);
  }
} finally {
  try {
    $(3);
  } finally {
    $(4);
  }
}
`````

## Pre Normal

`````js filename=intro
{
  let $implicitThrow$3 = false;
  let $finalStep = false;
  let $finalCatchArg$3 = undefined;
  let $finalArg = undefined;
  $finally$3: {
    try {
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
        }
        if ($implicitThrow) {
          $finalStep = true;
          $finalArg = $finalCatchArg;
          break $finally$3;
        } else {
        }
      }
    } catch ($finalImplicit$3) {
      $implicitThrow$3 = true;
      $finalCatchArg$3 = $finalImplicit$3;
    }
  }
  {
    {
      let $implicitThrow$1 = false;
      let $finalCatchArg$1 = undefined;
      $finally$1: {
        try {
          $(3);
        } catch ($finalImplicit$1) {
          $implicitThrow$1 = true;
          $finalCatchArg$1 = $finalImplicit$1;
        }
      }
      {
        $(4);
      }
      if ($implicitThrow$1) throw $finalCatchArg$1;
      else {
      }
    }
  }
  if ($implicitThrow$3) throw $finalCatchArg$3;
  else if ($finalStep) throw $finalArg;
  else {
  }
}
`````

## Normalized

`````js filename=intro
let $implicitThrow$3 = false;
let $finalStep = false;
let $finalCatchArg$3 = undefined;
let $finalArg = undefined;
$finally$3: {
  try {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    try {
      $(1);
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
    $(2);
    if ($implicitThrow) {
      $finalStep = true;
      $finalArg = $finalCatchArg;
      break $finally$3;
    } else {
    }
  } catch ($finalImplicit$3) {
    $implicitThrow$3 = true;
    $finalCatchArg$3 = $finalImplicit$3;
  }
}
let $implicitThrow$1 = false;
let $finalCatchArg$1 = undefined;
try {
  $(3);
} catch ($finalImplicit$1) {
  $implicitThrow$1 = true;
  $finalCatchArg$1 = $finalImplicit$1;
}
$(4);
if ($implicitThrow$1) {
  throw $finalCatchArg$1;
} else {
  if ($implicitThrow$3) {
    throw $finalCatchArg$3;
  } else {
    if ($finalStep) {
      throw $finalArg;
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
let $implicitThrow$3 = false;
let $finalStep = false;
let $finalCatchArg$3 = undefined;
let $finalArg = undefined;
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  try {
    $(1);
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  $(2);
  if ($implicitThrow) {
    $finalStep = true;
    $finalArg = $finalCatchArg;
  } else {
  }
} catch ($finalImplicit$3) {
  $implicitThrow$3 = true;
  $finalCatchArg$3 = $finalImplicit$3;
}
let $implicitThrow$1 = false;
let $finalCatchArg$1 = undefined;
try {
  $(3);
} catch ($finalImplicit$1) {
  $implicitThrow$1 = true;
  $finalCatchArg$1 = $finalImplicit$1;
}
$(4);
if ($implicitThrow$1) {
  throw $finalCatchArg$1;
} else {
  if ($implicitThrow$3) {
    throw $finalCatchArg$3;
  } else {
    if ($finalStep) {
      throw $finalArg;
    } else {
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
let b = false;
let c = undefined;
let d = undefined;
let e = false;
let f = undefined;
try {
  try {
    $( 1 );
  }
catch (g) {
    e = true;
    f = g;
  }
  $( 2 );
  if (e) {
    b = true;
    d = f;
  }
}
catch (h) {
  a = true;
  c = h;
}
let i = false;
let j = undefined;
try {
  $( 3 );
}
catch (k) {
  i = true;
  j = k;
}
$( 4 );
if (i) {
  throw j;
}
else {
  if (a) {
    throw c;
  }
  else {
    if (b) {
      throw d;
    }
  }
}
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
