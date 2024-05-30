# Preval test case

# finally_wrapping_function.md

> Ref tracking > Done > Try-finally-return > Finally wrapping function

## Options

- refTest

## Input

`````js filename=intro
try {
  
} finally {
  function f() {
    let x = 1;
    try {
      if ($()) {
        x = 2;
        return 100;
      }
    } finally {
      $(x); // can see 1 2
    }
  }
  $(f);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let $implicitThrow$1___4__ = false;
let $finalCatchArg$1___8__ = undefined___9__;
let f___12__ = function () {
  debugger;
  let x___18__ = 1;
  let $implicitThrow___22__ = false;
  let $finalStep___26__ = false;
  let $finalCatchArg___30__ = undefined___31__;
  let $finalArg___34__ = undefined___35__;
  $finally___37__: /*38*/ {
    try /*40*/ {
      const tmpIfTest___43__ = $();
      if (tmpIfTest___47__) {
        /*48*/ x___52__ = 2;
        $finalStep___56__ = true;
        $finalArg___60__ = 100;
        break $finally___62__;
      } /*63*/ else {
      }
    } catch ($finalImplicit___65__) /*66*/ {
      $implicitThrow___70__ = true;
      $finalCatchArg___74__ = $finalImplicit___73__;
    }
  }
  $(x___78__);
  if ($implicitThrow___80__) {
    /*81*/ throw $finalCatchArg___83__;
  } /*84*/ else {
    if ($finalStep___86__) {
      /*87*/ return $finalArg___90__;
    } /*91*/ else {
      return undefined___93__;
    }
  }
};
$(f___97__);
if ($implicitThrow$1___99__) {
  /*100*/ throw $finalCatchArg$1___102__;
} /*103*/ else {
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
$implicitThrow$1:
  - w @4             | ########## | 99          | none           | none
  - r @99            | 4

$finalCatchArg$1:
  - w @8             | ########## | 102         | none           | none
  - r @102           | 8

f:
  - w @12            | ########## | 97          | none           | none
  - r @97            | 12

x:
  - w @18            | ########## | 78          | none           | 52
  - w @52            | ########## | 78          | 18             | none
  - r @78            | 18,52

$implicitThrow:
  - w @22            | ########## | 80          | none           | 70
  - w @70            | ########## | 80          | 22             | none
  - r @80            | 22,70

$finalStep:
  - w @26            | ########## | 86          | none           | 56
  - w @56            | ########## | 86          | 26             | none
  - r @86            | 26,56

$finalCatchArg:
  - w @30            | ########## | 83          | none           | 74
  - w @74            | ########## | 83          | 30             | none
  - r @83            | 30,74

$finalArg:
  - w @34            | ########## | 90          | none           | 60
  - w @60            | ########## | 90          | 34             | none
  - r @90            | 34,60

tmpIfTest:
  - w @43            | ########## | 47          | none           | none
  - r @47            | 43
