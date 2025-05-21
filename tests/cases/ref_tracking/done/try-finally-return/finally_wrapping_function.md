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
let $implicitThrow$1___6__ = false;
let $finalCatchArg$1___9__ = undefined___10__;
let f___12__ = function () /*14*/ {
  debugger;
  let x___22__ = 1;
  let $implicitThrow___25__ = false;
  let $finalStep___28__ = false;
  let $finalCatchArg___31__ = undefined___32__;
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


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
$implicitThrow$1:
  - w @6             | ########## | 97          | none           | none
  - r @97            | 6

$finalCatchArg$1:
  - w @9             | ########## | 100         | none           | none
  - r @100           | 9

f:
  - w @12            | ########## | 95          | none           | none
  - r @95            | 12

x:
  - w @22            | ########## | 70,76       | none           | 52
  - w @52            | ########## | 70,76       | 22             | none
  - r @70            | 22,52
  - r @76            | 22,52

$implicitThrow:
  - w @25            | ########## | 78          | none           | none
  - r @78            | 25

$finalStep:
  - w @28            | ########## | 84          | none           | 56
  - w @56            | ########## | 84          | 28             | none
  - r @84            | 28,56

$finalCatchArg:
  - w @31            | ########## | 81          | none           | none
  - r @81            | 31

$finalArg:
  - w @34            | ########## | 88          | none           | 60
  - w @60            | ########## | 88          | 34             | none
  - r @88            | 34,60

tmpIfTest:
  - w @43            | ########## | 47          | none           | none
  - r @47            | 43

$finalImplicit:
  - w @65            | ########## | 72          | none           | none
  - r @72            | 65
