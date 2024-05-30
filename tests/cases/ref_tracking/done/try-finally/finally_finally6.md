# Preval test case

# finally_finally6.md

> Ref tracking > Done > Try-finally > Finally finally6

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    x = 2;
  } finally {
    x = 3;
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
      x___40__ = 2;
    } catch ($finalImplicit___42__) /*43*/ {
      $implicitThrow___47__ = true;
      $finalCatchArg___51__ = $finalImplicit___50__;
    }
    x___55__ = 3;
    if ($implicitThrow___57__) {
      /*58*/ $finalStep___62__ = true;
      $finalArg___66__ = $finalCatchArg___65__;
      break $finally$1___68__;
    } /*69*/ else {
    }
  } catch ($finalImplicit$1___71__) /*72*/ {
    $implicitThrow$1___76__ = true;
    $finalCatchArg$1___80__ = $finalImplicit$1___79__;
  }
}
$(x___84__);
if ($implicitThrow$1___86__) {
  /*87*/ throw $finalCatchArg$1___89__;
} /*90*/ else {
  if ($finalStep___92__) {
    /*93*/ throw $finalArg___95__;
  } /*96*/ else {
    $(x___100__);
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 84,100      | none           | 40,55
  - w @40      | ########## | 84,100      | 4              | 55
  - w @55      | ########## | 84,100      | 4,40           | none
  - r @84      | 4,40,55
  - r @100     | 4,40,55

$implicitThrow$1:
  - w @8             | ########## | 86          | none           | 76
  - w @76            | ########## | 86          | 8              | none
  - r @86            | 8,76

$finalStep:
  - w @12            | ########## | 92          | none           | 62
  - w @62            | ########## | 92          | 12             | none
  - r @92            | 12,62

$finalCatchArg$1:
  - w @16            | ########## | 89          | none           | 80
  - w @80            | ########## | 89          | 16             | none
  - r @89            | 16,80

$finalArg:
  - w @20            | ########## | 95          | none           | 66
  - w @66            | ########## | 95          | 20             | none
  - r @95            | 20,66

$implicitThrow:
  - w @29            | ########## | 57          | none           | 47
  - w @47            | ########## | 57          | 29             | none
  - r @57            | 29,47

$finalCatchArg:
  - w @33            | ########## | 65          | none           | 51
  - w @51            | ########## | 65          | 33             | none
  - r @65            | 33,51
