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
      $(x___62__);
      throw $finalImplicit___64__;
    }
  }
  $(x___68__);
  if ($implicitThrow___70__) {
    /*71*/ throw $finalCatchArg___73__;
  } /*74*/ else {
    if ($finalStep___76__) {
      /*77*/ return $finalArg___80__;
    } /*81*/ else {
      return undefined___83__;
    }
  }
};
$(f___87__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 87          | none           | none
  - r @87      | 4

x:
  - w @10      | ########## | 62,68       | none           | 55
  - w @55      | ########## | 62,68       | 10             | none
  - r @62      | 10,55
  - r @68      | 10,55

$implicitThrow:
  - w @14          | ########## | 70          | none           | none
  - r @70          | 14

$finalStep:
  - w @18          | ########## | 76          | none           | 44
  - w @44          | ########## | 76          | 18             | none
  - r @76          | 18,44

$finalCatchArg:
  - w @22          | ########## | 73          | none           | none
  - r @73          | 22

$finalArg:
  - w @26          | ########## | 80          | none           | 48
  - w @48          | ########## | 80          | 26             | none
  - r @80          | 26,48

tmpIfTest:
  - w @35          | ########## | 39          | none           | none
  - r @39          | 35
