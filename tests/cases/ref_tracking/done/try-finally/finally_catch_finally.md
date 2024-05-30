# Preval test case

# finally_catch_finally.md

> Ref tracking > Done > Try-finally > Finally catch finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
} finally {
  $(x);       // x=1 2 3 4 5
}
$(x);         // x=4 5
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalStep___12__ = false;
let $finalCatchArg$1___16__ = undefined___17__;
let $finalArg___20__ = undefined___21__;
$finally$1___23__: /*24*/ {
  try /*26*/ {
    $(x___30__);
    x___34__ = 2;
    let $implicitThrow___37__ = false;
    let $finalCatchArg___41__ = undefined___42__;
    try /*44*/ {
      $(x___48__);
      x___52__ = 3;
    } catch ($finalImplicit___54__) /*55*/ {
      $implicitThrow___59__ = true;
      $finalCatchArg___63__ = $finalImplicit___62__;
    }
    $(x___67__);
    x___71__ = 4;
    if ($implicitThrow___73__) {
      /*74*/ $finalStep___78__ = true;
      $finalArg___82__ = $finalCatchArg___81__;
      break $finally$1___84__;
    } /*85*/ else {
    }
  } catch ($finalImplicit$1___87__) /*88*/ {
    $implicitThrow$1___92__ = true;
    $finalCatchArg$1___96__ = $finalImplicit$1___95__;
  }
}
$(x___100__);
if ($implicitThrow$1___102__) {
  /*103*/ throw $finalCatchArg$1___105__;
} /*106*/ else {
  if ($finalStep___108__) {
    /*109*/ throw $finalArg___111__;
  } /*112*/ else {
    $(x___116__);
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30,100,116  | none           | 34
  - r @30      | 4
  - w @34      | ########## | 48,67,100,116 | 4              | 52,71
  - r @48      | 34
  - w @52      | ########## | 67,100,116  | 34             | 71
  - r @67      | 34,52
  - w @71      | ########## | 100,116     | 34,52          | none
  - r @100     | 4,34,52,71
  - r @116     | 4,34,52,71

$implicitThrow$1:
  - w @8             | ########## | 102         | none           | 92
  - w @92            | ########## | 102         | 8              | none
  - r @102           | 8,92

$finalStep:
  - w @12            | ########## | 108         | none           | 78
  - w @78            | ########## | 108         | 12             | none
  - r @108           | 12,78

$finalCatchArg$1:
  - w @16            | ########## | 105         | none           | 96
  - w @96            | ########## | 105         | 16             | none
  - r @105           | 16,96

$finalArg:
  - w @20            | ########## | 111         | none           | 82
  - w @82            | ########## | 111         | 20             | none
  - r @111           | 20,82

$implicitThrow:
  - w @37            | ########## | 73          | none           | 59
  - w @59            | ########## | 73          | 37             | none
  - r @73            | 37,59

$finalCatchArg:
  - w @41            | ########## | 81          | none           | 63
  - w @63            | ########## | 81          | 41             | none
  - r @81            | 41,63
