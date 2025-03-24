# Preval test case

# try-break-finally-break.md

> Ref tracking > Done > Try-finally-return > Try-break-finally-break
> Trying to come up with a case where abrupt flow distortion matters

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  a: {
    x = 2;
    b: {
      x = 3;
      try {
        if ($) {
          x = 4;
          break a;
        }
        x = 5;
      } finally {
        $(x); // 3 4 5
        if ($) {
          x = 6;
          break b;
        }
        x = 7;
      }
      $(x); // 7
    }
    $(x); // 6 7
  }
  $(x); // 6 7
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
a___7__: /*8*/ {
  b___10__: /*11*/ {
    x___18__ = 2;
    x___22__ = 3;
    let $implicitThrow___24__ = false;
    let $finalStep___27__ = false;
    let $finalCatchArg___30__ = undefined___31__;
    $finally___33__: /*34*/ {
      try /*36*/ {
        if ($) {
          /*39*/ x___43__ = 4;
          $finalStep___47__ = true;
          break $finally___49__;
        } /*50*/ else {
          x___54__ = 5;
        }
      } catch ($finalImplicit___56__) /*57*/ {
        $implicitThrow___61__ = true;
        $finalCatchArg___65__ = $finalImplicit___64__;
      }
    }
    $(x___69__);
    if ($) {
      /*72*/ x___76__ = 6;
      break b___78__;
    } /*79*/ else {
      x___83__ = 7;
      if ($implicitThrow___85__) {
        /*86*/ throw $finalCatchArg___88__;
      } /*89*/ else {
        if ($finalStep___91__) {
          /*92*/ break a___94__;
        } /*95*/ else {
          $(x___99__);
        }
      }
    }
  }
  $(x___103__);
}
$(x___107__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 18
  - w @18      | ########## | not read    | 4              | 22
  - w @22      | ########## | 69          | 18             | 43,54,76,83
  - w @43      | ########## | 69          | 22             | 76,83
  - w @54      | ########## | 69          | 22             | 76,83
  - r @69      | 22,43,54
  - w @76      | ########## | 103,107     | 22,43,54       | none
  - w @83      | ########## | 99,103,107  | 22,43,54       | none
  - r @99      | 83
  - r @103     | 76,83
  - r @107     | 76,83

$implicitThrow:
  - w @24          | ########## | 85          | none           | 61
  - w @61          | ########## | 85          | 24             | none
  - r @85          | 24,61

$finalStep:
  - w @27          | ########## | 91          | none           | 47
  - w @47          | ########## | 91          | 27             | none
  - r @91          | 27,47

$finalCatchArg:
  - w @30          | ########## | 88          | none           | 65
  - w @65          | ########## | 88          | 30             | none
  - r @88          | 30,65
