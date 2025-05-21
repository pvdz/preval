# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally-return > Try finally

## Options

- refTest

## Input

`````js filename=intro
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
`````


## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () /*6*/ {
  debugger;
  let x___14__ = 1;
  let $implicitThrow___17__ = false;
  let $finalStep___20__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  let $finalArg___26__ = undefined___27__;
  $finally___29__: /*30*/ {
    try /*32*/ {
      const tmpIfTest___35__ = $();
      if (tmpIfTest___39__) {
        /*40*/ x___44__ = 2;
        $finalStep___48__ = true;
        $finalArg___52__ = 100;
        break $finally___54__;
      } /*55*/ else {
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


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 87          | none           | none
  - r @87      | 4

x:
  - w @14      | ########## | 62,68       | none           | 44
  - w @44      | ########## | 62,68       | 14             | none
  - r @62      | 14,44
  - r @68      | 14,44

$implicitThrow:
  - w @17          | ########## | 70          | none           | none
  - r @70          | 17

$finalStep:
  - w @20          | ########## | 76          | none           | 48
  - w @48          | ########## | 76          | 20             | none
  - r @76          | 20,48

$finalCatchArg:
  - w @23          | ########## | 73          | none           | none
  - r @73          | 23

$finalArg:
  - w @26          | ########## | 80          | none           | 52
  - w @52          | ########## | 80          | 26             | none
  - r @80          | 26,52

tmpIfTest:
  - w @35          | ########## | 39          | none           | none
  - r @39          | 35

$finalImplicit:
  - w @57          | ########## | 64          | none           | none
  - r @64          | 57
