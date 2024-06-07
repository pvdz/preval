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
      $(x___70__);
      throw $finalImplicit___72__;
    }
  }
  $(x___76__);
  if ($implicitThrow___78__) {
    /*79*/ throw $finalCatchArg___81__;
  } /*82*/ else {
    if ($finalStep___84__) {
      /*85*/ return $finalArg___88__;
    } /*89*/ else {
      return undefined___91__;
    }
  }
};
$(f___95__);
if ($implicitThrow$1___97__) {
  /*98*/ throw $finalCatchArg$1___100__;
} /*101*/ else {
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
$implicitThrow$1:
  - w @4             | ########## | 97          | none           | none
  - r @97            | 4

$finalCatchArg$1:
  - w @8             | ########## | 100         | none           | none
  - r @100           | 8

f:
  - w @12            | ########## | 95          | none           | none
  - r @95            | 12

x:
  - w @18            | ########## | 70,76       | none           | 52
  - w @52            | ########## | 70,76       | 18             | none
  - r @70            | 18,52
  - r @76            | 18,52

$implicitThrow:
  - w @22            | ########## | 78          | none           | none
  - r @78            | 22

$finalStep:
  - w @26            | ########## | 84          | none           | 56
  - w @56            | ########## | 84          | 26             | none
  - r @84            | 26,56

$finalCatchArg:
  - w @30            | ########## | 81          | none           | none
  - r @81            | 30

$finalArg:
  - w @34            | ########## | 88          | none           | 60
  - w @60            | ########## | 88          | 34             | none
  - r @88            | 34,60

tmpIfTest:
  - w @43            | ########## | 47          | none           | none
  - r @47            | 43
