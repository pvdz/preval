# Preval test case

# finally_finally5.md

> Ref tracking > Done > Try-finally > Finally finally5

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x);     // x=1
    x = 2;
    $(x);     // x=2
  } finally {
    $(x);     // x=1 2
    x = 3;
    $(x);     // x=3
  }
} finally {
  $(x);       // x=1 2 3
}
$(x);         // x=3
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
    let $implicitThrow___29__ = false;
    let $finalCatchArg___33__ = undefined___34__;
    try /*36*/ {
      $(x___40__);
      x___44__ = 2;
      $(x___48__);
    } catch ($finalImplicit___50__) /*51*/ {
      $implicitThrow___55__ = true;
      $finalCatchArg___59__ = $finalImplicit___58__;
    }
    $(x___63__);
    x___67__ = 3;
    $(x___71__);
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
  - w @4       | ########## | 40,63,100,116 | none           | 44,67
  - r @40      | 4
  - w @44      | ########## | 48,63,100,116 | 4              | 67
  - r @48      | 44
  - r @63      | 4,44
  - w @67      | ########## | 71,100,116  | 4,44           | none
  - r @71      | 67
  - r @100     | 4,44,67
  - r @116     | 4,44,67

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
  - w @29            | ########## | 73          | none           | 55
  - w @55            | ########## | 73          | 29             | none
  - r @73            | 29,55

$finalCatchArg:
  - w @33            | ########## | 81          | none           | 59
  - w @59            | ########## | 81          | 33             | none
  - r @81            | 33,59