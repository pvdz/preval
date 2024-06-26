# Preval test case

# try-break-finally-break2.md

> Ref tracking > Done > Try-finally-return > Try-break-finally-break2
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
          x = 6; // overwrites 3 4 5
          break b;
        }
      }
      $(x); // 5 (b/c 3=throw and 4=break, skips this)
    }
    $(x); // 5 6 (b/c 3=throw and skips this)
  }
  $(x); // 4 5 6 (b/c 3=throw and skips this)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
a___7__: /*8*/ {
  b___10__: /*11*/ {
    x___15__ = 2;
    x___19__ = 3;
    let $implicitThrow___22__ = false;
    let $finalStep___26__ = false;
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
      if ($implicitThrow___81__) {
        /*82*/ throw $finalCatchArg___84__;
      } /*85*/ else {
        if ($finalStep___87__) {
          /*88*/ break a___90__;
        } /*91*/ else {
          $(x___95__);
        }
      }
    }
  }
  $(x___99__);
}
$(x___103__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 15
  - w @15      | ########## | not read    | 4              | 19
  - w @19      | ########## | 69,95,99,103 | 15             | 43,54,76
  - w @43      | ########## | 69,95,99,103 | 19             | 76
  - w @54      | ########## | 69,95,99,103 | 19             | 76
  - r @69      | 19,43,54
  - w @76      | ########## | 99,103      | 19,43,54       | none
  - r @95      | 19,43,54
  - r @99      | 19,43,54,76
  - r @103     | 19,43,54,76

$implicitThrow:
  - w @22          | ########## | 81          | none           | 61
  - w @61          | ########## | 81          | 22             | none
  - r @81          | 22,61

$finalStep:
  - w @26          | ########## | 87          | none           | 47
  - w @47          | ########## | 87          | 26             | none
  - r @87          | 26,47

$finalCatchArg:
  - w @30          | ########## | 84          | none           | 65
  - w @65          | ########## | 84          | 30             | none
  - r @84          | 30,65
