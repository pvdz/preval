# Preval test case

# multi_finally_break.md

> Ref tracking > Tofix > Multi finally break
>
> 

#TODO

## Input

`````js filename=intro
let x = 1;
foo: {
  try {
    try { 
      x = 2;
      break foo;
    } finally {
      x = 3 
    }
  } finally {
    x = 4
  }
}
$(x); // x=4
`````

## Pre Normal

`````js filename=intro
let x = 1;
foo: {
  {
    let $implicitThrow$1 = false;
    let $finalStep$1 = false;
    let $finalStep$3 = false;
    let $finalCatchArg$1 = undefined;
    let $finalArg = undefined;
    $finally$1: {
      try {
        {
          let $implicitThrow = false;
          let $finalStep = false;
          let $finalCatchArg = undefined;
          $finally: {
            try {
              x = 2;
              {
                $finalStep = true;
                break $finally;
              }
            } catch ($finalImplicit) {
              $implicitThrow = true;
              $finalCatchArg = $finalImplicit;
            }
          }
          {
            x = 3;
          }
          if ($implicitThrow) {
            $finalStep$1 = true;
            $finalArg = $finalCatchArg;
            break $finally$1;
          } else {
            $finalStep$3 = true;
            break $finally$1;
          }
        }
      } catch ($finalImplicit$1) {
        $implicitThrow$1 = true;
        $finalCatchArg$1 = $finalImplicit$1;
      }
    }
    {
      x = 4;
    }
    if ($implicitThrow$1) throw $finalCatchArg$1;
    else if ($finalStep$1) throw $finalArg;
    else if ($finalStep$3) break foo;
    else {
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
foo: {
  let $implicitThrow$1 = false;
  let $finalStep$1 = false;
  let $finalStep$3 = false;
  let $finalCatchArg$1 = undefined;
  let $finalArg = undefined;
  $finally$1: {
    try {
      let $implicitThrow = false;
      let $finalStep = false;
      let $finalCatchArg = undefined;
      $finally: {
        try {
          x = 2;
          $finalStep = true;
          break $finally;
        } catch ($finalImplicit) {
          $implicitThrow = true;
          $finalCatchArg = $finalImplicit;
        }
      }
      x = 3;
      if ($implicitThrow) {
        $finalStep$1 = true;
        $finalArg = $finalCatchArg;
        break $finally$1;
      } else {
        $finalStep$3 = true;
        break $finally$1;
      }
    } catch ($finalImplicit$1) {
      $implicitThrow$1 = true;
      $finalCatchArg$1 = $finalImplicit$1;
    }
  }
  x = 4;
  if ($implicitThrow$1) {
    throw $finalCatchArg$1;
  } else {
    if ($finalStep$1) {
      throw $finalArg;
    } else {
      if ($finalStep$3) {
        break foo;
      } else {
      }
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
$(4);
`````

## PST Output

With rename=true

`````js filename=intro
$( 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
