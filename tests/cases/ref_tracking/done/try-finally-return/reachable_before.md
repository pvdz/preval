# Preval test case

# reachable_before.md

> Ref tracking > Done > Try-finally-return > Reachable before

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    if ($()) {
      return;
    }
    x = 2;
  } finally {
    $(x); // 1 or 2
  }
}
$(f);
`````

## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () {
  debugger;
  let x___10__ = 1;
  let $implicitThrow___14__ = false;
  let $finalStep___18__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  let $finalArg___26__ = undefined___27__;
  $finally___29__: /*30*/ {
    try /*32*/ {
      const tmpIfTest___35__ = $();
      if (tmpIfTest___39__) {
        /*40*/ $finalStep___44__ = true;
        $finalArg___48__ = undefined___47__;
        break $finally___50__;
      } /*51*/ else {
        x___55__ = 2;
      }
    } catch ($finalImplicit___57__) /*58*/ {
      $implicitThrow___62__ = true;
      $finalCatchArg___66__ = $finalImplicit___65__;
    }
  }
  $(x___70__);
  if ($implicitThrow___72__) {
    /*73*/ throw $finalCatchArg___75__;
  } /*76*/ else {
    if ($finalStep___78__) {
      /*79*/ return $finalArg___82__;
    } /*83*/ else {
      return undefined___85__;
    }
  }
};
$(f___89__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 89          | none           | none
  - r @89      | 4

x:
  - w @10      | ########## | 70          | none           | 55
  - w @55      | ########## | 70          | 10             | none
  - r @70      | 10,55

$implicitThrow:
  - w @14          | ########## | 72          | none           | 62
  - w @62          | ########## | 72          | 14             | none
  - r @72          | 14,62

$finalStep:
  - w @18          | ########## | 78          | none           | 44
  - w @44          | ########## | 78          | 18             | none
  - r @78          | 18,44

$finalCatchArg:
  - w @22          | ########## | 75          | none           | 66
  - w @66          | ########## | 75          | 22             | none
  - r @75          | 22,66

$finalArg:
  - w @26          | ########## | 82          | none           | 48
  - w @48          | ########## | 82          | 26             | none
  - r @82          | 26,48

tmpIfTest:
  - w @35          | ########## | 39          | none           | none
  - r @39          | 35
